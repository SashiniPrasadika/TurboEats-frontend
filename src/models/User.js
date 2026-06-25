// src/models/User.js
class User {
  constructor(userData = {}) {
    this.id = userData.id ?? null;
    this.name = userData.name || '';
    this.email = userData.email || '';
    this.username = userData.username || '';
    this.phone = userData.phone || '';
    this.address = userData.address || {};
    this.company = userData.company || {};
  }

  isValid() {
    return Boolean(this.email && this.name);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      phone: this.phone,
      address: this.address,
      company: this.company,
    };
  }

  static fromAPI(data = {}) {
    const nameParts = [];
    if (data.first_name) nameParts.push(data.first_name);
    if (data.last_name) nameParts.push(data.last_name);
    const name = nameParts.join(' ') || data.name || '';

    return new User({
      id: data.id,
      name,
      email: data.email,
      username: data.username || (data.email ? data.email.split('@')[0] : ''),
      phone: data.phone_number || data.phone || '',
      address: data.address || {},
      company: data.company || {},
    });
  }

  static createUserList(dataArray = []) {
    if (!Array.isArray(dataArray)) return [];
    return dataArray.map((d) => User.fromAPI(d));
  }
}

export default User;
