import BrowserStorage from '@src/data/browser-storage/BrowserStorage';
import BrowserStorageKey from '@src/data/browser-storage/BrowserStorageKey';
import BrowserStorageMapper from '@src/data/browser-storage/BrowserStorageMapper';
import { Auth } from '@src/auth/Auth';

// mapper
class AuthMapper implements BrowserStorageMapper<Auth> {
    fromJson(json: any): Auth {
        return Object.setPrototypeOf(json, Auth.prototype);
    }

    toJson(target: Auth): any {
        return target;
    }
}

// storage
export const AuthStorage = new BrowserStorage<Auth>(BrowserStorageKey.AUTH, new AuthMapper());
