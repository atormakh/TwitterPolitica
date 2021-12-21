import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toolbar, Box } from "@mui/material";
import { TwitterAppBar } from "./components/TwitterAppBar/TwitterAppBar";
import { TwitterDrawer } from "./components/TwitterDrawer/TwitterDrawer";
import Home from "./pages/Home";
import Common from "./pages/common";
import Shared from "./pages/Shared";
import Words from "./pages/words";
import Engagement from "./pages/Engagement";

import "./App.css";

const drawerWidth = 240;
const sections = [
  { title: "Resumen", href: "/", element: <Home /> },
  { title: "Seguidos en común", href: "/shared", element: <Shared /> },
  { title: "Intersección de seguidores", href: "/common", element: <Common /> },
  { title: "Palabras frecuentes", href: "/words", element: <Words /> },
  { title: "Interacciones", href: "/engagement", element: <Engagement /> },
  // {title:"ElasticSearcsh",href:"/elasticsearch"},
  // {title:"MongoDB",href:"/mongoDB"},
];

function App() {
  return (
    <div className="App">
      <Router basename="">
        <Box sx={{ display: "flex" }}>
          <TwitterAppBar drawerWidth={drawerWidth} />
          <TwitterDrawer drawerWidth={drawerWidth} sections={sections} />

          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />

            <Routes>
              {sections.map((section, index) => (
                <Route
                  key={index}
                  path={section.href}
                  element={section.element}
                />
              ))}
            </Routes>
          </Box>
        </Box>
      </Router>
    </div>
  );
}

export default App;
