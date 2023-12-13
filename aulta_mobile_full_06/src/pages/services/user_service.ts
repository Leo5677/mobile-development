import { User } from "../model/User";
import { authStorage } from "./auth_storage";

class UserService {
  private url = "http://192.168.0.108:3030/users";
  
  private async getHeaders() {
    const logged = await authStorage.getLoggedUser();
    const token = logged && logged.token ? logged.token : null;

    if (!token) throw new Error("Token is Null");
  }

  public async list() {
    const logged = await authStorage.getLoggedUser();
    const token = logged && logged.token ? logged.token : null;

    if (!token) throw new Error("Token is Null");

    const response = await fetch(this.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else if (response.status === 401) {
      throw new Error(data.message);
    }
  }

  public async create(name: string, username: string, password: string) {
    const logged = await authStorage.getLoggedUser();
    const token = logged && logged.token ? logged.token : null;

    if (!token) throw new Error("Token is Null");

    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, username, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      return data;
    } else if (response.status === 401) {
      throw new Error(data.message);
    }
  }

  public async update(id: number, name: string, password: string) {
    const logged = await authStorage.getLoggedUser();
    const token = logged && logged.token ? logged.token : null;

    if (!token) throw new Error("Token is Null");

    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      return data;
    } else if (response.status === 401) {
      throw new Error(data.message);
    }
  }
  
  public async delete(id: number | undefined) {
    const logged = await authStorage.getLoggedUser();
    const token = logged && logged.token ? logged.token : null;

    if (!token) throw new Error("Token is Null");

    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (response.status === 201) {
      return data;
    } else if (response.status === 401) {
      throw new Error(data.message);
    }
  }
}

export const userService = new UserService();
