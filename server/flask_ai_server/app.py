from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from waitress import serve
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

model_path = "./models/models/fine_tuned_model/checkpoint-3"
tokenizer = GPT2Tokenizer.from_pretrained(model_path, local_files_only=True)
model = GPT2LMHeadModel.from_pretrained(model_path, local_files_only=True)

tokenizer.pad_token = tokenizer.eos_token
model.config.pad_token_id = tokenizer.eos_token_id

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

if torch.cuda.is_available():
    model.half()


@app.route("/generate-report", methods=["POST"])
def generate_report():
    data = request.json
    incident_details = data.get("incidentDetails")

    if not incident_details:
        return jsonify({"error": "No incident details provided"}), 400

    incident_type = incident_details.get("incidentType")
    location = incident_details.get("location")
    description = incident_details.get("description")

    if not all([incident_type, location, description]):
        return jsonify({"error": "Missing required incident details"}), 400

    prompt = f"Incident Type: {incident_type}\nLocation: {location}\nDescription: {description}"

    inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
    inputs = {key: val.to(device) for key, val in inputs.items()}

    outputs = model.generate(
        inputs["input_ids"],
        max_length=400,
        pad_token_id=tokenizer.eos_token_id,
        temperature=0.7,
        top_k=50,
        no_repeat_ngram_size=2,
    )

    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({"message": generated_text})


if __name__ == "__main__":
    serve(app, host="127.0.0.1", port=5001)
