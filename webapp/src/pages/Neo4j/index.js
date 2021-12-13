
import { useEffect } from "react"
import { useLocation } from "react-router-dom";
import * as NeoVis from "neovis.js"
//import * as neo4j from "neo4j-driver"
// import * as d3 from "d3";
// const uri = "neo4j://localhost:7687"
// const driver = neo4j.driver(uri)
// const session = driver.session()

// function ForceGraph({
//     nodes, // an iterable of node objects (typically [{id}, …])
//     links // an iterable of link objects (typically [{source, target}, …])
//   }, {
//     nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
//     nodeGroup, // given d in nodes, returns an (ordinal) value for color
//     nodeGroups, // an array of ordinal values representing the node groups
//     nodeTitle, // given d in nodes, a title string
//     nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
//     nodeStroke = "#fff", // node stroke color
//     nodeStrokeWidth = 1.5, // node stroke width, in pixels
//     nodeStrokeOpacity = 1, // node stroke opacity
//     nodeRadius = 5, // node radius, in pixels
//     nodeStrength,
//     linkSource = ({source}) => source, // given d in links, returns a node identifier string
//     linkTarget = ({target}) => target, // given d in links, returns a node identifier string
//     linkStroke = "#999", // link stroke color
//     linkStrokeOpacity = 0.6, // link stroke opacity
//     linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
//     linkStrokeLinecap = "round", // link stroke linecap
//     linkStrength,
//     colors = d3.schemeTableau10, // an array of color strings, for the node groups
//     width = 640, // outer width, in pixels
//     height = 400, // outer height, in pixels
//     invalidation // when this promise resolves, stop the simulation
//   } = {}) {
//     // Compute values.
//     const N = d3.map(nodes, nodeId).map(intern);
//     const LS = d3.map(links, linkSource).map(intern);
//     const LT = d3.map(links, linkTarget).map(intern);
//     if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
//     const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
//     const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
//     const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);

//     // Replace the input nodes and links with mutable objects for the simulation.
//     nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
//     links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));

//     // Compute default domains.
//     if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

//     // Construct the scales.
//     const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

//     // Construct the forces.
//     const forceNode = d3.forceManyBody();
//     const forceLink = d3.forceLink(links).id(({index: i}) => N[i]);
//     if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
//     if (linkStrength !== undefined) forceLink.strength(linkStrength);

//     const simulation = d3.forceSimulation(nodes)
//         .force("link", forceLink)
//         .force("charge", forceNode)
//         .force("center",  d3.forceCenter())
//         .on("tick", ticked);

//     const svg = d3.create("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .attr("viewBox", [-width / 2, -height / 2, width, height])
//         .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

//     const link = svg.append("g")
//         .attr("stroke", linkStroke)
//         .attr("stroke-opacity", linkStrokeOpacity)
//         .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
//         .attr("stroke-linecap", linkStrokeLinecap)
//       .selectAll("line")
//       .data(links)
//       .join("line");

//     const node = svg.append("g")
//         .attr("fill", nodeFill)
//         .attr("stroke", nodeStroke)
//         .attr("stroke-opacity", nodeStrokeOpacity)
//         .attr("stroke-width", nodeStrokeWidth)
//       .selectAll("circle")
//       .data(nodes)
//       .join("circle")
//         .attr("r", nodeRadius)
//         .call(drag(simulation));

//     if (W) link.attr("stroke-width", ({index: i}) => W[i]);
//     if (G) node.attr("fill", ({index: i}) => color(G[i]));
//     if (T) node.append("title").text(({index: i}) => T[i]);
//     if (invalidation != null) invalidation.then(() => simulation.stop());

//     function intern(value) {
//       return value !== null && typeof value === "object" ? value.valueOf() : value;
//     }

//     function ticked() {
//       link
//         .attr("x1", d => d.source.x)
//         .attr("y1", d => d.source.y)
//         .attr("x2", d => d.target.x)
//         .attr("y2", d => d.target.y);

//       node
//         .attr("cx", d => d.x)
//         .attr("cy", d => d.y);
//     }

//     function drag(simulation) {    
//       function dragstarted(event) {
//         if (!event.active) simulation.alphaTarget(0.3).restart();
//         event.subject.fx = event.subject.x;
//         event.subject.fy = event.subject.y;
//       }

//       function dragged(event) {
//         event.subject.fx = event.x;
//         event.subject.fy = event.y;
//       }

//       function dragended(event) {
//         if (!event.active) simulation.alphaTarget(0);
//         event.subject.fx = null;
//         event.subject.fy = null;
//       }

//       return d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended);
//     }

//     return Object.assign(svg.node(), {scales: {color}});
//   }

// const chart = ForceGraph(miserables, {
//     nodeId: d => d.id,
//     nodeGroup: d => d.group,
//     nodeTitle: d => `${d.id}\n${d.group}`,
//     linkStrokeWidth: l => Math.sqrt(l.value),
//     width,
//     height: 600,
//     invalidation // a promise to stop the simulation when the cell is re-run
//   })


function drawGraph(query) {
    var config = {
        container_id: "viz",
        server_url: "bolt://localhost:7687",
        server_user: "",
        server_password: "",
        labels: {
            "User": {
                "size": "size",
                "title_properties":[],
                "caption":"id",
                "font":{
                    "size":8
                }

            },
            "Candidate": {

                "caption": "screen_name",
                "size": "size",
                "font":{
                    "size":12,
                }

            }
        },
        relationships: {
            "follows": {
                "thickness": "weight",
                "caption": false,
            },
        },
        "hierarchical":false,
        initial_cypher: query
    };

    let viz = new NeoVis.default(config);
    viz.render();
}


export default function Neo4j() {
    const location = useLocation();

    useEffect(() => {
        //let result = await session.writeTransaction(tx => tx.run("match(u:User)-[r]->(c:Candidate) return u,c,r limit 25"))
        //console.log(result)
        let params = new URLSearchParams(location.search)
        drawGraph(params.get("q"));

    }, [location])


    return (
        <div id="viz" style={{ height: 1000 }}>

        </div>
    )
}

