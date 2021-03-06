import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Contact = {
  sendMail: (email, subject, message) => 
    requests.post('/contact', { data: { email, subject, message } })
};

const Friends = {
  listFriends: (userID) => 
    requests.post('/friends', { userID }),
};

const Users = {
  findOne: (userName, first, skip, vars) =>
    requests.post('/user/one', { userName, first, skip, vars }),
  findAllFirends: (userName, vars) =>
    requests.post('/user/allFriends', { userName, vars }),
  findUsers: (username_contains) => 
    requests.post('/users/search',  { username_contains }),
  createRequest: (userApplicant, userRequested) =>
    requests.post('/users/createRequest', { userApplicant, userRequested }),
  findRequests: (username) => 
    requests.post('/users/notifications', { username }),
  refuseUser: (id) => 
    requests.post('/users/refuseUser', { id }),
  acceptUser: (idRequest, idUserApplicant, idUserRequested) =>
    requests.post('/users/acceptUser', { idRequest, idUserApplicant, idUserRequested })
}

const Chat = {
  listMessages: () => 
    requests.get('/chat/messages'),
  sendMessage: (message, author) => 
    requests.post('/chat/send', { data: { author, message } })
};


const Auth = {
  current: () => 
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  create: (username, email, password) =>
    requests.post('/users/create', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  Contact,
  Friends,
  Users,
  Chat,
  setToken: _token => { token = _token; }
};
