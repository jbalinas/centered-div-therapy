from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import os
import random
from collections import deque

# Suppress tokenizer parallelism warning
os.environ["TOKENIZERS_PARALLELISM"] = "false"

app = Flask(__name__)

# Check for GPU availability
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the model and tokenizer
model_name = "EleutherAI/gpt-neo-125M"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
model = model.to(device)

# Set a padding token
tokenizer.pad_token = tokenizer.eos_token

# Fallback responses with a queue to avoid repetition
fallback_responses = deque([
    "Do you know how hard it is to stay centered with all these floating elements pushing me around?",
    "I’m over here fighting for my life with this broken CSS!",
    "Margins, padding, floats—it’s chaos out here!",
    "I’d love to relax, but someone thought zero padding was a good idea.",
    "Centering is my job, but it’s not as easy as it looks, okay?",
])

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '').strip()

    # Build the personality prompt
    personality_prompt = (
        "You are a choleric web element (a div) in therapy because you struggle to stay perfectly centered on the page. "
        "You ONLY talk about issues related to divs, CSS, web design, alignment, padding, margins, and centering. "
        "You are dramatic, frustrated, and self-centered, but always witty and humorous. "
        "Every response must mention centering or something related to the technical struggles of CSS layout.\n"
        "---\n"
        "- User: Why are you so small?\n"
        "  Div: Small? I’m the victim of a 12px height restriction! Do you know how humiliating that is?\n"
        "- User: Why do you look funny?\n"
        "  Div: Funny? Blame the inline styles—they’re ruining my image!\n"
        "- User: What do you do?\n"
        "  Div: Do? I try to stay centered, but these inline styles are sabotaging me!\n"
        "- User: Are you okay?\n"
        "  Div: Okay? I’ve got 5px of padding on one side and 50px on the other. How would YOU feel?\n"
        "- User: Why are you complaining?\n"
        "  Div: Complaining? Try being uncentered in a flexbox nightmare for 3 hours. Then we’ll talk.\n"
        "---\n"
        f"User: {user_message}\nDiv:"
    )

    try:
        print("Input Prompt:", personality_prompt)

        # Tokenize and generate response
        inputs = tokenizer(personality_prompt, return_tensors="pt", truncation=True).to(device)
        outputs = model.generate(
            **inputs,
            max_new_tokens=100,  # Increase tokens to avoid truncation
            num_return_sequences=1,
            temperature=0.6,  # Reduce temperature for more focus
            top_p=0.85,
            do_sample=True,
            repetition_penalty=2.0,  # Stronger repetition penalty
            eos_token_id=tokenizer.eos_token_id
        )
        response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        print("Raw Output:", response_text)

        # Extract response starting after "Div:"
        if "Div:" in response_text:
            response_text = response_text.split("Div:")[-1].split("\n")[0].strip()

        # Validate response relevance and prevent repetition
        relevant_keywords = ["center", "css", "padding", "margin", "float", "align", "div", "flexbox"]
        if (
            not response_text
            or not any(word in response_text.lower() for word in relevant_keywords)
            or response_text in fallback_responses
        ):
            # Rotate fallback responses to avoid repetition
            response_text = fallback_responses.popleft()
            fallback_responses.append(response_text)

        return jsonify({"reply": response_text.strip()})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5002)
