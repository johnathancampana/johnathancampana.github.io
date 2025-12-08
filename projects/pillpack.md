# Scaling "PillPack" on Amazon Pharmacy

**TL;DR:** I played a key role in migrating the PillPack service (pre-sorted, daily medication packets) from [PillPack.com](http://www.pillpack.com) onto the modern Amazon Pharmacy wesbite. After contributing key backend logic for the MVP launch, I served as tech lead for the subsequent expansion to Medicare/Medicaid customers, managing a team of 9 engineers to update eligibility requirements and allow users to order [short-term supplies](https://pharmacy.amazon.com/pillpack/short-term-supply) with insurance.

Check it out <a href="https://pharmacy.amazon.com/pillpack" target="_blank" rel="noopener noreferrer">here</a>!

---

### Project Details
* **Role:** Software Engineer -> Tech Lead
* **Scope:** 2 Major Launches (MVP + Medicare/Medicaid Expansion)
* **Core Skills:** Technical Leadership, System Design, Project Management, Healthcare Compliance
* **Team:** Led up to 9 Engineers (Phase 2)

---

### The Problem: The Complexity of Adherence
For patients with chronic conditions, managing medication is a full-time job. A 2023 poll revealed that US adults spend the equivalent of one workday per month just coordinating healthcare for themselves and their family or loved ones.

While PillPack (acquired by Amazon in 2018) solved this with pre-sorted packets, it was not integrated with Amazon Pharmacy. We aimed to rebuild it as a fully integrated experience to allow customers to synchronize their prescriptions and switch to packets from their Amazon Pharmacy account with just a few clicks.

### The Challenge & Solution
This project consisted of two distinct phases, during which my responsibilities grew significantly.

**Phase 1: The MVP**
The initial challenge was determining *who* could actually use the service based on clinical and insurance constraints.
* **Eligibility Engine:** I built a system that determined if a given set of medications for a given customer were eligible for the program. This system evaluated eligibility across several dimensions to vend real-time eligibility status via an API.

**Phase 2: Medicare, Medicaid & Automation**
Following the MVP, we needed to expand to customers with government insurance. This came with added complexity due to strict regulatory requirements and the need for "Medication Synchronization" (aligning all refills to the same date).
* **Leading the Team:** I served as the tech lead for my team, managing the roadmap and task sequencing for up to **9 engineers** over **54 dev weeks**. I served as the primary bridge between Product, Program Management, and Engineering to resolve blockers.
* **Automating "MedSync":** To align prescription dates, we had to file "short-term supply" claims. I contributed to the design of an automated system that utilized specific MedSync codes when communicating with Pharmacy Benefit Managers (PBMs). This prevented "Refill Too Soon" rejections and allowed insurance to cover the transitional supply—a process that previously required manual pharmacist intervention.
* **Regulatory Compliance:** We implemented "Price Protection" and specific "Insurance-Only" workflows to meet federal requirements for Medicare/Medicaid beneficiaries.

### The Impact
The two launches successfully delivered the PillPack.com experience on Amazon Pharmacy. In addition to ongoing initiatives to launch caregiver support and over the counter medications in packets, they laid the foundation for sunsetting PillPack.com.

* **Adoption:** The expanded service drove immediate traction, with high-value customers (average 5.45 prescriptions) enrolling at a **34.4% conversion rate**.
* **Operational Efficiency:** The automated MedSync logic was accepted by major PBMs (CVS, Express Scripts, Blue Shield), significantly reducing the manual burden on pharmacists.
* **Scale:** Within four weeks of the Phase 2 launch, over **500** Medicare/Medicaid customers enrolled, with **64%** of short-term supply orders fully covered by insurance due to our new claim logic.

### Retrospective: What I Learned
* **Leadership without Authority:** Leading 9 engineers required clear communication, consensus-building, and helping resolve a long stream of technical challenges and new requirements. I learned how to sequence complex dependencies to keep a large team unblocked. I also experienced the joy of reviewing a pull request for a feature I had designed but didn't write any code for.
* **The "Last Mile" of Healthcare:** Building logic that could automatically negotiate "short term supplies" with insurance companies was a masterclass in solving real-world business friction. I was lucky to collaborate with some great engineers that showed me that even the most technical regulatory requirements can be taken into consideration and automated to create an experience that feels seemless for the customer.