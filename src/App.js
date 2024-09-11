import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./elements/Home";
import Students from "./elements/Students";
import Create from "./elements/Create";
import Edit from "./elements/Edit";

import Books from "./elements/Books";
import Bcreate from "./elements/Bcreate";
import Bedit from "./elements/Bedit";
import Library from "./elements/Library";
import Lcreate from "./elements/Lcreate";
import Ledit from "./elements/Ledit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="students/create" element={<Create />} />
        <Route path="students/edit/:id" element={<Edit />} />
        <Route path="/books" element={<Books />} />
        <Route path="books/bcreate" element={<Bcreate />} />
        <Route path="books/bedit/:id" element={<Bedit />} />
        <Route path="/library" element={<Library />} />
        <Route path="library/lcreate" element={<Lcreate />} />
        <Route path="library/ledit/:id" element={<Ledit />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
