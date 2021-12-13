import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toolbar, Box } from "@mui/material";
import { TwitterAppBar } from "./components/TwitterAppBar/TwitterAppBar";
import { TwitterDrawer } from "./components/TwitterDrawer/TwitterDrawer";
import Home from "./pages/Home";
import Neo4j from "./pages/Neo4j"
import MongoDB from "./pages/MongoDB"
import Redis from "./pages/Redis"
import ElasticSearch from "./pages/ElasticSearch";
import './App.css';

const drawerWidth = 240;
const sections = [{title:"Home", href:"/"},
{title:"Neo4j",href:"/neo4j"},
{title:"Redis",href:"/redis"},
{title:"ElasticSearch",href:"/elasticsearch"},
{title:"MongoDB",href:"/mongoDB"},]

function App() {

  return (
    <div className="App">
      <Router basename="">
        <Box sx={{ display: 'flex' }}>
          <TwitterAppBar drawerWidth={drawerWidth} />
          <TwitterDrawer drawerWidth={drawerWidth} sections={sections} />

          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Toolbar />

            <Routes>
              <Route exact path="/" element={Home()} />
              <Route path="/neo4j" element={<Neo4j/>} />
              <Route path="/mongoDB" element={MongoDB()} />
              <Route path="/redis" element={Redis()} />
              <Route path="/elasticsearch" element={ElasticSearch()} />
            </Routes>

          </Box>
        </Box>
      </Router>
    </div>
  );
}

export default App;
