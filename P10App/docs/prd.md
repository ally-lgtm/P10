P10 Pick — Product Requirements Document (PRD)

Project Phase: Specification 1
Version: Draft 1.0
Date: November 2025

1. Overview

Product Summary:
P10 Pick is a mobile-first fantasy Formula 1 app that reimagines race predictions by focusing on challenging, overlooked outcomes such as:

10th-place finisher

First retirement

Fastest lap

Players make three strategic picks per race and earn points based on accuracy, with bonuses for performance stats (e.g., most overtakes, fastest pit stop, double constructor finishes). The system automates scoring and displays real-time leaderboards via a clean, social, mobile experience.

The goal: Make F1 fantasy play fast, social, and fair, without spreadsheets or manual score tracking.

2. Objectives

Deliver a lightweight, mobile-friendly fantasy F1 experience.

Automate scoring using live F1 data integrations.

Encourage social engagement through leagues and leaderboards.

Provide transparency in scoring to build user trust.

3. Target Users
Segment	Demographic	Goals	Needs
Casual Fans	Ages 18–30	Quick, fun predictions	Simple onboarding, reminders, clarity on scoring
League Organizers / Competitive Fans	Ages 25–40	Create leagues, compete with friends	Fair scoring automation, leaderboard visibility, sharing/invites

Usage Context:

Platform: Mobile-first (responsive web app, future app store version possible)

Engagement: Pre-race predictions, live tracking during race, post-race score viewing

Connectivity: Requires live internet to fetch race data (Supabase backend)

Spec 1 - Strategy + Scope + Sel…

4. Core Features (MVP)
#	User Story	Feature Type	Status
1	Make three picks: P10 finisher, first retirement, fastest lap	Gameplay	✅ Keep
2	Auto-score race results after each Grand Prix	Scoring Automation	✅ Keep
3	Create private leagues to track season standings	Social	✅ Keep
4	View leaderboard after each race	Display	✅ Keep
5	Receive bonus points (fastest pit stop, most overtakes)	Gameplay	✅ Keep
6	See scoring breakdown for each race	UX Transparency	✅ Keep
7	View upcoming race schedule	Utility	✅ Keep
8	Invite friends via shareable link	Onboarding	✅ Keep
9	Edit picks before race cutoff	Usability	✅ Keep
10	View past race results & history	Retention	✅ Keep
(Features 11–29 rejected for MVP; see Appendix)

Spec 1 - User Stories (29)

			
5. Feature Details
5.1 Game Flow

Make Picks:
Users select predictions for each category (P10, first retirement, fastest lap).

Deadline: Before race start.

Picks editable until cutoff.

Scoring Engine:

Automated using F1 data APIs (via Supabase).

Bonus logic includes:

Fastest pit stop (+5 pts)

Most overtakes (+3 pts)

Constructor double finish (+2 pts)

Leaderboard:

Displays global and league-based rankings.

Updates automatically post-race.

Includes breakdown by race and cumulative totals.

Leagues:

Users can create, join, or invite friends via shareable links.

Season standings persist across races.

History & Analytics:

View past race scores, historical picks, and total points over time.

6. Functional Requirements
ID	Requirement	Priority
FR-1	Users must be able to create accounts and log in.	High
FR-2	Picks must be editable until race cutoff.	High
FR-3	System must auto-fetch race results from API.	High
FR-4	Points must be calculated automatically.	High
FR-5	Users can join/create leagues.	High
FR-6	Leaderboards must update dynamically post-race.	High
FR-7	Bonus conditions must be applied correctly.	Medium
FR-8	Display upcoming races and deadlines.	Medium
FR-9	View scoring breakdowns and history.	Medium
FR-10	Shareable invite links for leagues.	Medium
7. Non-Functional Requirements
Category	Requirement
Performance	Score updates within 5 minutes of race completion
Scalability	Support 10k concurrent users
Availability	99.9% uptime during race weekends
Security	JWT-based authentication via Supabase
UI/UX	Mobile-first, responsive design
Localization	English for MVP (expand later)
8. Design Reference

Feature Diagram (from page 2, “Strategy + Scope” spec):
Depicts the core modules:

Play: Join League / Create League / Invite Friends

Pick: Select P10 / Predict Retirement / Submit Fastest Lap

Score: Auto-score, Apply Bonuses, Constructor Bonus

View: Leaderboard / Race Schedule / Drivers & Teams

Spec 1 - Strategy + Scope + Sel…

9. Dependencies

Supabase: Backend for authentication, data storage, and live updates.

F1 Data API: Provides real-time race results and statistics.

Frontend Framework: React or Flutter Web (TBD).

Hosting: Vercel or Firebase for initial deployment.

10. Risks and Mitigations
Risk	Impact	Mitigation
API reliability	High	Cache data and retry logic
Scoring disputes	Medium	Public scoring breakdown
Onboarding friction	Medium	Guided tutorial (future release)
Over-complex social features	Low	Phase in after MVP
11. Success Metrics

DAU/WAU ratio > 40% (strong recurring play)

Average picks per race ≥ 80% of registered users

League participation ≥ 60% of active users

Score update latency < 5 min

12. Future Enhancements (Post-MVP)

Theme customization

Push notifications for cutoff reminders

Compare stats between players

Animated score celebrations

Live chat (moderated)

API performance tracking

Appendix A – Rejected Stories Summary

Features 11–29 (onboarding tutorials, cosmetic themes, chat, F1 TV sync, memes, betting, etc.) were rejected as non-core or high complexity items for MVP