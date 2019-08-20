const express = require("express");
const server = new express();

server.use(express.json());

const projects = [{ id: "0", title: "Teste", task: [] }];
var i = 0;
server.use((req, res, next) => {
  console.log(i++);
  next();
});

function projectExist(req, res, next) {
  let projectsId = projects[req.params.id];
  if (!projectsId) {
    res.status(400).json({ error: "Projec doesn't exist" });
  } else {
    return next();
  }
}
function projectErrorExist(req, res, next) {
  let projectsId = projects[req.body.id];
  if (projectsId) {
    res.status(400).json({ error: "Project already exists" });
  } else {
    return next();
  }
}

server.get("/projects", (req, res) => {
  res.json(projects);
});

server.get("/projects/:id", projectExist, (req, res) => {
  const { id } = req.params;
  res.json(projects[id]);
});

server.post("/projects/", projectErrorExist, (req, res) => {
  const data = req.body;
  projects.push(data);
  res.json(projects);
});

server.post("/projects/:id/task", projectExist, (req, res) => {
  const data = req.body;
  const { id } = req.params;

  projects[id].task = data;
  res.json(projects);
});

server.put("/projects/:id", projectExist, (req, res) => {
  const { id } = req.params;

  const data = req.body;
  projects[id] = data;
  res.json(projects);
});

server.delete("/projects/:id", projectExist, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  res.send();
});

server.listen(3003);
