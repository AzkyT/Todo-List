This is an app was created specifically for an assignment using AI.

## How To Run

After cloning, open your terminal and install the necessary packages using the following:
```bash
npm install
```

Once the packages are installed. Run the following.
```bash
npm run dev
```

Once the local host link appears in your terminal, you can click it to open the website in your browser and start using the app.

### App Platform
Our app is designed for the Web platform (only tested on Mac and Windows - needs Ubuntu).

### Tech Stack
The app uses the following tech stack:
- React
- TypeScript
- Prisma
- Tailwind CSS

### App Intro
**TickIt**: A simple and intuitive task management application.

### Tool Intro
I used the following tools for development:
- [GitHub Copilot](https://github.com/features/copilot)
- [ChatGPT](https://www.openai.com/chatgpt)

I used ChatGPT primarily in the beginning stages of my website. I used it to figure out how to make my To Do App as easy to use with the least amount of inputs as necessary. I also used it give me some lightweight databases I could use which run well locally and create the models for it.
- "Whats a simple database I can use for a simple locally run todo list website?"

In the actual development of my app, I used Copilot the most. In creating the endpoints and pages (React and Tailwind) for my website, I used Copilot's code completion to help write code faster and generate code for sections that I knew what I wanted them to do but didn't know how to write.
- I often started writing a line of code and let Copilot finish it for the majority of the project
- I relied on Copilot to generate Tailwind CSS styles for my components

When debugging, I also relied heavily on Copilot's inline editor and chat to fix and explain the code.

### Overview
The To Do App allows users to create, manage, and track their tasks efficiently. Users can add new tasks, mark them as completed, and delete them as needed. New tasks include a title, a deadline date and an optional space for notes. Tasks are automatically sorted by earliest date and completion and deletion of a task is as easy as left or right clicking (respectively).

The app is built using React for the frontend, TypeScript for type safety, Prisma for database management, and Tailwind CSS for styling. The development process involved setting up the project structure, implementing CRUD operations for tasks, and ensuring a responsive and user-friendly interface.
