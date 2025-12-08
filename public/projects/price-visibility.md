# Improving Price Visibility for Customers Facing 'Refill Too Soon' Rejections

**TL;DR:** I identified a papercut in our user experience where temporary insurance rejections prevented customers from seeing pricing information. I pitched a solution to senior leadership to show pricing information even when the offer was not currently available, a novel concept at the time. The pitch was a success, and I managed an engineering intern to deliver the feature, resulting in a **23% increase** in price visibility.

![CX Before vs. After](/src/assets/RTS_Improvement.png)

---

### Project Details
* **Role:** Product Manager & Tech Lead (Intern Mentor)
* **Core Skills:** Product Strategy, Stakeholder Management, Mentorship, UX Design
* **Impact:** 23% increase in insurance offers with visible pricing

---

### The Problem: The "Refill Too Soon" Blind Spot
In the pharmacy industry, insurance plans often reject claims if a customer tries to order a refill before they have used up ~80% of their previous supply (known as "Refill Too Soon" or RTS).

At Amazon Pharmacy, **1 in 5 insurance offers** displayed to customers were an RTS rejection. The legacy system treated "Price" and "Availability" as coupled entities—if the medication wasn't available for purchase *right now* (due to the rejection), the system wouldn't show the insurance price at all.

As a result, customers only saw the high "Cash Price" or "Sticker Price." This created false sticker shock, causing customers to make poorly informed purchasing decisions or call Customer Support, believing their insurance coverage had been dropped or that the price had skyrocketed.

### The Challenge & Solution
This project was special for me because I drove it from the initial spark of an idea into the delivery of a feature seen by tens of thousands of customers daily.

**1. Ideation & Buy-In**
I authored a 1-page white paper arguing that we should display the *previous* insurance price even when the *current* offer is not buyable. I used several pieces of anecdotal data that I discovered while on-call to show that "sticker shock" was driving support costs and churn. I pitched this to senior leadership and successfully secured the engineering headcount (in the form of an intern) to build it.

**2. Technical Strategy: Decoupling Logic**
I designed the technical plan to fundamentally change how our backend served pricing data, as well as the logic for retrieving the previous price.

This change came in handy later when we found new use cases for displaying previous insurance prices, like when a medication was enrolled in an automatic refill program and we couldn't file a new claim until we began to process the next order.

**3. Execution & Mentorship**
I served as the tech lead and mentor for an engineering intern. I broke down the project into a roadmap, reviewed all code across the stack (frontend, backend, and pricing services), and guided the intern through development, QA and launch. This was my first rigorous experience moving from individual contributor to engineering manager.

### The Impact
The feature launched on September 6, 2024, successfully solving the transparency gap for returning customers.

* **23% Increase in Price Visibility:** We successfully surfaced insurance prices on nearly a quarter of previously "price-blind" page visits.
* **Improved Trust:** By showing the previous price (e.g., "$10.00") next to the "Refill Too Soon" message, we reassured customers that their coverage was still active and reminded them what they had previously paid, reducing the cognitive load of managing chronic medications.

### Retrospective: What I Learned
* **The Art of Internal Selling:** Great code doesn't matter if you can't convince the business to build it. This project taught me how to build a business case around customer insights to win executive buy-in.
* **Management is a Skill:** Guiding an intern to success was harder than writing the code myself. I learned how to balance "unblocking" them with giving them enough room to learn and grow.
* **Agency is Rewarded:** As an early-career engineer at a large corporation that typically operates top-down, this bottoms up approach to product innovation was new to me. It served as a great reminder that if you have a good idea and can convince others that it is worth pursuing, you can shape the product vision even at a company like Amazon and even if it is not in your job description. Proactively shaping the product was not only extremely fun for me, but helped strengthen my reputation within the organization.