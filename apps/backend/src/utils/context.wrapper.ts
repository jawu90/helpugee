import httpContext from 'express-http-context';
import contextKey from "./context.key";
import Role from "../models/role.enum";

class ContextWrapper {
    public setUsername(username: string) {
        httpContext.set(contextKey.username, username);
    }

    public getUsername(): string {
        return httpContext.get(contextKey.username);
    }

    public setSectionId(sectionId: number) {
        httpContext.set(contextKey.sectionId, sectionId);
    }

    public getSectionId(): number {
        return httpContext.get(contextKey.sectionId);
    }

    public setRole(role: Role) {
        httpContext.set(contextKey.role, role);
    }

    public getRole(): Role {
        return httpContext.get(contextKey.role);
    }
}

const contextWrapper: ContextWrapper = new ContextWrapper();

export default contextWrapper;