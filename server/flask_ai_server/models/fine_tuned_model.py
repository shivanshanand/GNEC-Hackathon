from transformers import GPT2LMHeadModel, GPT2Tokenizer, Trainer, TrainingArguments
from transformers import TextDataset, DataCollatorForLanguageModeling

# Load pre-trained GPT-2 model and tokenizer
model = GPT2LMHeadModel.from_pretrained("gpt2")
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
tokenizer.pad_token = tokenizer.eos_token  # Set EOS token as pad token to avoid errors

# Load your custom dataset (_data.txt)
dataset = TextDataset(
    tokenizer=tokenizer,
    file_path="../data/complaints_data.txt",  # Path to your _data.txt file
    block_size=128,  # Adjust block size as needed
)

# Create a data collator for language modeling (not for masked language modeling)
data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer, mlm=False  # This is for causal language modeling (GPT-2)
)

# Define the training arguments
training_args = TrainingArguments(
    output_dir="./models/fine_tuned_model",  # Directory to save the fine-tuned model
    overwrite_output_dir=True,  # Overwrite the output directory if it exists
    num_train_epochs=3,  # Number of epochs for training
    per_device_train_batch_size=2,  # Adjust batch size based on your hardware
    save_steps=500,  # Save checkpoint every 500 steps
    save_total_limit=2,  # Keep only the last 2 checkpoints
    logging_dir="./logs",  # Directory for logs
)

# Initialize the Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=dataset,  # Use the dataset for training
)

# Train the model
trainer.train()

# Save the fine-tuned model and tokenizer
model.save_pretrained("./models/fine_tuned_model")
tokenizer.save_pretrained("./models/fine_tuned_model")

print("Model fine-tuned and saved successfully.")
