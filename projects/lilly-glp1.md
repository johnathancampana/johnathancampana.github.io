 <!-- {
    "title": "Architecting Insurance-Dependent Cash Pricing for Eli Lilly’s GLP-1 Launch",
    "slug": "lilly-glp1",
    "role": "Software Engineer",
    "company": "Amazon Pharmacy",
    "type": "Strategic Partnership",
    "skills": ["Distributed Systems Design", "Root Cause Analysis", "API Design", "Stakeholder Management"],
    "summary": "Led the technical implementation of insurance-dependent cash coupons for Eli Lilly’s GLP-1 drugs, re-architecting pricing to cross-reference insurance claim status while determining cash offers.",
    "date": "2024-03-15"
  }, -->


# Architecting Insurance-Dependent Cash Pricing for Eli Lilly’s GLP-1 Launch

**TL;DR:** I led the technical implementation of "Insurance-Dependent Cash Coupons" for Eli Lilly’s blockbuster GLP-1 drugs (Zepbound/Mounjaro). This required re-architecting our pricing engine to cross-reference insurance rejections with cash offers in real-time, unlocking **$161MM in annualized GMS** and resolving critical pricing transparency issues.

---

### Project Details

* **Role:** Software Engineer
* **Scope:** Strategic Partnership / High-Visibility Launch
* **Core Skills:** Distributed Systems Design, Root Cause Analysis, API Design, Stakeholder Management
* **Impact:** Enabled availability for 158k+ units of medication; solved VP-level escalations regarding pricing errors.

---

### The Problem: The "Non-Covered" Paradox

GLP-1 medications (like Zepbound and Mounjaro) are in high demand but are frequently denied by insurance providers. To maintain patient access, Eli Lilly wanted to offer a "Non-Covered Coupon"—a discount applied *only* after a patient’s insurance formally rejects the claim.

**The Technical Gap:**

Our APIs treated "Cash Pricing" and "Insurance Pricing" as isolated workflows.

1. **Cash Flow:** Checks drug price + standard coupons.  
2. **Insurance Flow:** Checks benefits + copay.

To support the Eli Lilly launch, we had to bridge this gap. The "Cash" pricing service needed to become "insurance-aware," waiting for specific rejection codes (e.g., *Refill Too Soon* or *Prior Auth Required*) before unlocking the manufacturer discount.

### The Challenge & Solution

I contributed to the initial launch, but quickly needed to become the subject matter expert on the technical details of the partnership after a large organizational restructuring and several high-profile issues.

**1. Designing "Indeterminate" States (API Design)**

We encountered a race condition where customers would load a page before their insurance claim had finished processing. If we showed the standard cash price ($1,000+) while waiting, they abandoned the cart ("Sticker Shock").

* **Solution:** I authored the Low-Level Design (LLD) to introduce an `Indeterminate` promotion state in our API. Instead of defaulting to "No Coupon," the system would explicitly signal `insufficient_insurance_information`.
* **Result:** This allowed the frontend to display a "Checking insurance..." state rather than a scary price tag, preserving conversion rates.

**2. The $550 vs. $1,020 Debug (Root Cause Analysis)**

Post-launch, a VP escalation highlighted a customer whose price fluctuated wildly between months ($550 vs $1,020) despite having a valid coupon.

* **Investigation:** I traced the issue through the distributed stack and discovered a flaw in our "Day Supply" quantity correction logic. The system was auto-correcting a 28-day supply down to a 27-day supply based on package size math.
* **The Bug:** The coupon was hard-coded for 28 days. The system auto-corrected the cart to 27 days. The coupon silently fell off, spiking the price by $500.
* **Fix:** I identified the root cause in the `FOS` (Fulfillment Optimization Service) logic and orchestrated the fix, validating that strict "Day Supply" matching rules were necessary for manufacturer compliance.

**3. Legacy Architecture vs. Urgent Deadlines**

With the engineering team experiencing high turnover during the project, I became the de-facto SME. I balanced "quick fixes" needed to meet Eli Lilly’s marketing dates with long-term architectural advocacy, eventually producing a High-Level Design (HLD) to decouple coupon logic from claims processing permanently.

### The Impact

This launch was critical for Amazon Pharmacy’s relationship with major pharma partners.

* **Financial Impact:** The program generated **$161MM in annualized Gross Merchandise Sales (GMS)** by making unaffordable medications accessible.
* **Partner Confidence:** Successfully delivering the "Non-Covered" logic proved Amazon could handle complex, conditional pharmaceutical pricing models, opening the door for future direct-purchasing agreements.
* **System Resilience:** The introduction of the `Indeterminate` state reduced "false negative" pricing errors, ensuring eligible customers didn't see inflated prices due to API latency.

### Retrospective: What I Learned

* **The Danger of "Silent Failures":** The logic that dropped the coupon because the quantity was *one pill off* (27 vs 28 days) taught me that in financial systems, strict failures are better than silent ones. We should have alerted the user, not just removed the discount.
* **Architecture is Politics:** Getting the "Cash" team and the "Insurance" team to agree on a data contract was harder than writing the code. I learned that excellent HLDs serve as negotiation documents, not just blueprints.


