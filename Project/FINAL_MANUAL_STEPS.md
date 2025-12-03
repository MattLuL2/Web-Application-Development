# Manual Steps You Must Do

1) GitHub repository
- Create a new GitHub repository named `library-app-backend` (or similar).
- In your local project folder run:

```cmd
git init
git add .
git commit -m "Initial commit - first release backend"
git remote add origin https://github.com/<YOUR_ORG_OR_USER>/library-app-backend.git
git branch -M main
git push -u origin main
```

- Ensure each team member makes at least one commit using their own GitHub account. If needed, have teammates clone, make a small change, commit and push.

2) Trello / Jira
- Create a Trello board called `Library App - Sprint 1`.
- Add Product Backlog and Task Board lists. Create cards as described in `trello_instructions.md`.

3) Environment & DB
- Install and run MongoDB locally or create an Atlas cluster. Update `.env` with `MONGO_URI`.

4) Slides & Photos
- Convert `slides/slides.md` into a 2-slide PowerPoint or Google Slides.
- Replace placeholders with your Team Logo and mugshots (no avatars allowed).

5) Video
- Record a 5–10 minute video using screen capture (Zoom, OBS, or similar).
- Include demonstration of: register, login, create/read/update/delete books, and short code walkthrough (controllers + middleware).
- Ensure audio is clear.
- Upload to YouTube (unlisted is fine) and add link to project README.

6) Submission
- Add the YouTube link and GitHub repository link to your assignment submission.


If you want, I can:
- Create the GitHub repo and push (I need your permission and remote URL).
- Convert the slides into a `.pptx` file.
- Create example front-end Postman collection with screenshots.
