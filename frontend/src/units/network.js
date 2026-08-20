import HTTPError from "./HTTPError";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

const fetchTasks = async (options = {}) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new HTTPError(
        `HTTP error! Status: ${response.status}`,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchProjects = async (options = {}) => {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new HTTPError(
        `HTTP error! Status: ${response.status}`,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchProjectMembers = async (projectId, options = {}) => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}/members`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new HTTPError(
        `HTTP error! Status: ${response.status}`,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const createTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const message = await response.text();

      throw new HTTPError(
        message || `HTTP error! Status: ${response.status}`,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const updateTask = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const message = await response.text();

      throw new HTTPError(
        message || `HTTP error! Status: ${response.status}`,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const registrate = async (regData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regData),
    });

    if (!response.ok) {
      throw new HTTPError(
        `HTTP error! Status: ${response.status}`,
        response.status,
      );
    }

    await response.json();

    return true;
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};

const authorize = async (authData) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (!response.ok) {
      throw new HTTPError(
        `HTTP error! Status: ${response.status}`,
        response.status,
      );
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    return true;
  } catch (error) {
    console.error("Authorization error:", error.message);
    throw error;
  }
};

const fetchCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new HTTPError(
      `HTTP error! Status: ${response.status}`,
      response.status,
    );
  }

  return await response.json();
};

export {
  fetchTasks,
  fetchProjects,
  fetchProjectMembers,
  createTask,
  updateTask,
  registrate,
  authorize,
  fetchCurrentUser,
};
