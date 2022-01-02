import http from "../http-common-categorie";

const getAll = () => { return http.get("/");};

const get = (id) => { return http.get(`/${id}`);};

const create = (data) => { return http.post("/", data);};

const update = ( data) => { return http.put("/",data);};

const remove = id => {return http.delete(`/${id}`);};

export default { getAll, get, create, update, remove,};