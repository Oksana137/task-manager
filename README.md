# NextStep · Task Manager

NextStep is a full-stack task manager for organizing work by project. Each project has a Kanban board for moving tasks from **To Do** through **On Progress** to **Done**, and a list view for reviewing and editing task details. The REST API stores changes in PostgreSQL, so both views reflect the same tasks.

![NextStep Kanban board with tasks in the To Do, On Progress, and Done columns](docs/screenshots/kanban-board.png)

## Features

- **Project workspace** — Sign up, sign in, and switch between your own projects from the sidebar.
- **Kanban board** — Create tasks, assign priorities, move cards between columns with drag and drop, and filter by status or priority.
- **List and task details** — Open a task to edit its title, description, status, or priority. Search the active project by task title or description from the workspace header.
- **Project ownership** — The API scopes project and task access to the signed-in account.

## Tech stack

| Layer | Technology | Role |
| --- | --- | --- |
| Frontend | React, React Router, Vite | Protected routes, board and list views, and shared state for auth, projects, and tasks through React Context |
| UI | Tailwind CSS, daisyUI, HTML Drag and Drop API | Responsive workspace, forms, and card movement between columns |
| Backend | Node.js, Express | REST endpoints for authentication, projects, and tasks |
| Data | PostgreSQL, Sequelize | Relational models for users, their projects, and tasks within each project |
| Authentication | bcrypt, JSON Web Tokens | Password hashing and bearer-token authentication |

## Run locally

The setup was verified with Node.js 20.20.2, npm 10.8.2, and PostgreSQL 15.8. You need Git, Node.js with npm, OpenSSL, and a running PostgreSQL instance with the `createdb` client on your PATH. Use a PostgreSQL role that can create databases and owns the application database.

### 1. Clone and install

```sh
git clone https://github.com/Oksana137/task-manager.git
cd task-manager
npm ci --prefix backend
npm ci --prefix frontend
```

### 2. Create and configure the database

The example uses your shell username as the PostgreSQL role and port `5432`. Set `PGUSER` and `PGPORT` for your instance before running these commands if your setup differs.

```sh
export PGHOST=127.0.0.1
export PGPORT="${PGPORT:-5432}"
export PGUSER="${PGUSER:-$(id -un)}"
createdb task_manager
```

Enter the connection URI for the new database when prompted, using the same host, port, and role as above. For example, use `postgresql://your_user:your_password@127.0.0.1:5432/task_manager`. Percent-encode reserved characters in the username or password. In Bash or Zsh, run this from the repository root to write both environment files:

```sh
printf 'PostgreSQL connection URI: '
read -rs task_manager_pg_uri
printf '\n'
cat > backend/.env <<EOF
PG_URI=$task_manager_pg_uri
JWT_SECRET=$(openssl rand -hex 32)
FRONTEND_URI=http://127.0.0.1:5174
PORT=3001
EOF
unset task_manager_pg_uri
cat > frontend/.env <<'EOF'
VITE_API_URL=http://127.0.0.1:3001
EOF
```

### 3. Start the API and frontend

From the repository root, start the API in one terminal. It creates the tables on first startup and logs `Server is running on port 3001` once it is ready.

```sh
npm --prefix backend start
```

In a second terminal, start Vite:

```sh
npm --prefix frontend run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Open [http://127.0.0.1:5174](http://127.0.0.1:5174). Select **Sign Up**, create an account, and sign in. Add a project from the sidebar, create a task, drag it to **On Progress**, and reload to confirm the change was saved. The **Try Demo** button requires a preconfigured demo account. Use **Sign Up** with a fresh database.

### Preview the frontend build

Keep the API running. Stop the Vite dev server to free port `5174`, then build and serve the compiled frontend at the same URL:

```sh
npm --prefix frontend run build
npm --prefix frontend run preview -- --host 127.0.0.1 --port 5174 --strictPort
```

## Screenshots

Captured from the locally running frontend build with sample project data using [Agent Browser](https://github.com/vercel-labs/agent-browser).

### Task list and details

![Task list with the selected task's description, status, and priority](docs/screenshots/task-list.png)

### New task

![New task form with fields for title, description, project, status, and priority](docs/screenshots/new-task.png)
