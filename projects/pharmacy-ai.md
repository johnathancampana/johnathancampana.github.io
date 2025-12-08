# Enabling Contextual Memory for the Amazon Pharmacy AI Assistant

**TL;DR:** I led the development of multi-turn conversational memory for the Amazon Pharmacy AI Assistant. By enabling the AI to retain context across messages, we transformed a basic Q&A bot into a conversational agent, contributing to an **8% reduction** in human support contacts. 

Try it out <a href="https://pharmacy.amazon.com/help-hub" target="_blank" rel="noopener noreferrer">here</a>!

---

### Project Details

* **Role:** Tech Lead
* **Core Skills:** Python, AWS Bedrock, LangChain, DynamoDB, Prompt Engineering
* **Type:** GenAI / LLM Product Launch

---

### The Problem: The "Stateless" Frustration

Amazon Pharmacy’s legacy support chatbot relied on static Knowledge Base Q&As. Our AI team improved on this by creating a new AI assisted chatbot that leveraged a RAG-based LLM solution. However, it was still "stateless" in that it treated every user query as an isolated event.

If a customer asked about a medication’s side effects, and then followed up with, *"Is **that** dangerous?"*, the AI would fail because it had no memory of the previous message to define what *"that"* referred to.

This friction forced customers to abandon the chat and call our Customer Care team. With calls being **2.7x more expensive** than chats, this lack of conversational continuity was a significant driver of operational costs.

### The Challenge & Solution

I owned the technical design and end-to-end implementation of the **Multi-Turn Conversation** feature.

* **Architectural Design:** Collaborating with a Principal Engineer, I designed a system using LangChain and DynamoDB to store session state and chat history. Then when the next query occurred, the system could inject relevant context into the LLM's prompt window for follow-up questions.
* **Prompt Engineering:** A significant challenge was tuning the model to distinguish between a new topic and a follow-up question. I refined the prompts to ensure the AI looked for context in previous turns before generating a response, but didn't over eagerly include unrelated context.
* **Privacy & Compliance:** Because chats could contain Protected Health Information (PHI) regarding prescriptions and order status, the design required strict adherence to data privacy standards, ensuring chat logs were handled securely.

### The Impact

The launch of multi-turn capabilities, alongside new personalization integrations, delivered immediate value by decreasing the need for human assistance.

* **8% Reduction in Support Volume:** The enhanced AI experience led to a statistically significant 8% decrease in daily Customer Care contacts compared to a randomly selected control group.
* **Improved Efficiency:** For the calls that did occur, the AI's ability to resolve pre-work reduced average handle times by **1.4%**.

### Retrospective: What I Learned

* **Latency vs. Quality:** We observed a 27% increase in latency (approx. 1.76s response time) due to context retrieval and the more complex queries to the underlying LLMs. I learned that for GenAI products, users are willing to tolerate slightly higher latency in exchange for significantly higher accuracy and personalization. 
* **Choosing the Right Success Metric** We chose decreased customer service contacts as our north star metric to measure the success of the new feature. Other metrics that initially seemed relevant, like number of turns per session or time spent interacting with the chatbot were poor indicators of the bots effectiveness because they didn't capture the nuanced motivation of users (i.e. because the bot was more helpful, some customers asked more questions, but when it solved their main problem more quickly, then they asked fewer).
* **The Joy of Building at the Cutting Edge:** At Amazon, most of the tools and tech stack we used were a combination of mainstream AWS services and proprietary in-house technologies. Working on the AI team allowed me to get outside of this bubble, and I enjoyed learning to use publicly available, and at the time new tools like LangChain and Bedrock.

