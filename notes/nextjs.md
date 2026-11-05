1) strand1:which URL will a file at app/tasks/page.tsx answer? Creates a link that navigates to /tasks.

strand 1: what will you see if you visit /task (singular)?The answer is a 404 Not Found page.

strand1: Look for the console.log output. Is it in the browser console or in the terminal 

Where npm run dev is running? in the terminal.

What its type was for /tasks/1. Why do you think it appeared there?
Because TaskPage is a Server Component by default in Next.js. Server Components execute on the server, so their console.log() output appears in the terminal rather than the browser console.

Why that attribute matters for screen readers?

Link vs Plain Anchor:
When I clicked the Next.js <Link>, navigation happened on the client side without a new full document request in the Network tab.When I changed it to a plain HTML <a href>, the browser made a new document request and performed a full page navigation.

## Route Review

The routes in my application are:

- `/` – Home page
- `/tasks` – All tasks page
- `/tasks/[id]` – Individual task page (e.g. `/tasks/1`)

### Checking the Five URL Rules

| Route | HTTPS | Short and readable | Lowercase | Hyphens, not underscores | Few query parameters |
|---|---|---|---|---|---|
| `/` | At deployment | Yes | Yes | N/A | Yes |
| `/tasks` | At deployment | Yes | Yes | N/A | Yes |
| `/tasks/[id]` | At deployment | Yes | Yes | N/A | Yes |

    strand2:
2) I predict a crash. page.tsx is a Server Component by default, and TaskBoard uses useState, which needs the browser. Server Components can’t use hooks.
error:"Error: You're importing a module that depends on `useEffect` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client"
error says that we are using a module TaskBoard.tsx that uses React hooks (useEffect, useState), these are browser dependents(means work only in browser)while files in /app are server components by default 

Did the console.log from TasksPage appear in the browser console or in the terminal? What was typeof window?
answer: The console.log appeared in the terminal, not in the browser console, and typeof window was "undefined". This tells me TasksPage runs on the server, where there is no browser and no window object. The browser only receives the HTML it produces, not the component itself.

7) Are the task titles in the raw HTML? Now compare with your Lab 4 Vite app: view its source too. Write down the difference and why it exists.

Answer: In the Next.js app, view-source shows the task titles inside <h3> tags, because the server fetched the tasks and rendered the HTML before sending it. In my Lab 4 Vite app, view-source shows only an empty <div id="root"> and a script tag, because the browser builds the page after loading JavaScript. The difference exists because Next.js renders on the server and Vite renders in the browser.

8) Server or Client?

| File | Server or Client? | Reason |
|---|---|---|
| app/layout.tsx | Server | No directive and no hooks, so it is the default |
| app/tasks/page.tsx | Server | Async, awaits fetchTasks(), no hooks |
| app/tasks/TaskBoard.tsx | Client | Has "use client" because it uses useState |
| app/tasks/TaskList.tsx | Client (by parent) | No directive, imported by TaskBoard |
| app/tasks/TaskCard.tsx | Client (by parent) | Imported through TaskList |
| app/tasks/FilterBar.tsx | Client (by parent) | Imported by TaskBoard |
| app/tasks/NewTaskForm.tsx | Client (by parent) | Imported by TaskBoard, uses useState |


  strand 3: 
 1) Route (app)
┌ ○ /
├ ○ /_not-found
├ ◐ /tasks
└   /tasks/[id]
  └ ◐ /tasks/[id]


○  (Static)             prerendered as static content
◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content
Your /tasks route may be listed as static even though it fetches data. If it is, explain in two sentences why that would be a problem if the tasks changed every minute?
Answer:No. /tasks is listed as ◐ (Partial Prerender), so only its shell is prerendered and the task data is fetched on the server for each request and streamed in. If /tasks had been fully static, the tasks would have been fetched once at build time and every visitor would see that old list until the next build. That would be a problem if the tasks changed every minute, because users would see stale data.

2) (a) A public page for one shared task: ahead of time or server. Search engines must see it, and it isn’t private or highly interactive. (b) A drag-and-drop planning board: browser. It’s private so search engines don’t need it, and it’s highly interactive. (c) An About page: ahead of time. Search engines must see it, and the content is the same for everyone and rarely changes.

stretch:
6) My route table shows /tasks as ◐ (Partial Prerender: prerendered as static HTML with dynamic server-streamed content), not fully static, because the task data is fetched on each request and streamed in behind the loading.tsx fallback. If /tasks had been fully static, the tasks would have been fetched once at build time and everyone would see stale data until the next build. For question 6, export const dynamic = "force-dynamic" was rejected with the error “Route segment config ‘dynamic’ is not compatible with nextConfig.cacheComponents”. After removing it and rebuilding, the table was identical to previous table.