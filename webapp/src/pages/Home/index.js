import "./index.css";

export default function Home() {
  const candidatesCapital = [
    {
      username: "JMilei",
      image: "milei.png",
    },
    {
      username: "SantoroLeandro",
      image: "santoro.png",
    },
    {
      username: "mariuvidal",
      image: "mariu.png",
    },
    {
      username: "myriambregman",
      image: "myriam.png",
    },
  ];
  const candidatesProvince = [
    {
      username: "RandazzoF",
      image: "randazzo.png",
    },
    {
      username: "NicolasdelCano",
      image: "delcano.png",
    },
    {
      username: "diegosantilli",
      image: "santilli.png",
    },
    {
      username: "vtolosapaz",
      image: "tolosa.png",
    },
    {
      username: "jlespert",
      image: "espert.png",
    },
    {
      username: "CynthiaHotton",
      image: "cynthia.png",
    },
  ];
  return (
    <div className="home-section">
      <h2>Idea y Motivación</h2>
      <p>
        Consideramos que twitter es una red social políticamente activa. Las
        elecciones legislativas del 2021 y el gran tráfico de intercambio de
        opiniones e información que se dio en esta red nos motivaron a elegir
        analizar aspectos de la actividad de los candidatos de las elecciones.
      </p>
      <h2>Integrantes del grupo</h2>
      <p>Agustin Jerusalinsky (60406)</p>
      <p>Agustin Tormakh (60041)</p>
      <p>Camila Borinsky (60083)</p>
      <h2>Candidatos que analizamos</h2>
      <h3>CABA</h3>
      {candidatesCapital.map((c) => {
        return (
          <img
            src={`candidateAccounts/${c.image}`}
            width="200"
            style={{ objectFit: "contain", margin: "5px" }}
            height="200"
            objectFit="contain"
            margin="5px"
          ></img>
        );
      })}
      <h3>Provincia de Buenos Aires</h3>
      {candidatesProvince.map((c) => {
        return (
          <img
            src={`candidateAccounts/${c.image}`}
            width="200"
            style={{ objectFit: "contain", margin: "8px" }}
            height="200"
            objectFit="contain"
            margin="5px"
          ></img>
        );
      })}
      <h2>Persistencia políglota</h2>
      <h3>MongoDB</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img src="dbms/mongodb.png" width="100" height="100"></img>
        <p style={{ margin: "12px" }}>
          Utilizamos MongoDB como dbms base para cargar los datos extraídos y
          luego exportarlos a otros motores. <br></br>Además para realizar
          consultas de agregación sobre el <i>engagement</i> de los seguidores
          de los candidatos.
        </p>
      </div>
      <h4>Modelado de datos</h4>
      <div>
        <img src="dbms/modelling/mongo_collections.png"></img>
      </div>
      <div>
        <img src="dbms/modelling/mongo_candidates.png"></img>
      </div>
      <div>
        <img src="dbms/modelling/mongo_followers.png"></img>
      </div>
      <div>
        <img src="dbms/modelling/mongo_followings.png"></img>
      </div>
      <div>
        <img src="dbms/modelling/mongo_tweets.png"></img>
      </div>
      <h4>Consultas</h4>
      <ul>
        <li>
          Exportado de datos de <i>followers</i> y <i>following</i> para luego
          importar a Neo4j.
        </li>
        <li>
          Exportado de datos de <i>tweets</i> para luego importar a
          elasticsearch
        </li>
        <li>
          Consulta para agrupar por candidato y contar cantidad total, promedio
          por tweet y promedio por tweet dividido por cantidad de seguidores de
          las variables: likes, retweets, replies y quotes
        </li>
      </ul>
      <h3>Neo4J</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img src="dbms/neo4j.png" width="100" height="100"></img>
        <p style={{ margin: "12px" }}>
          Utilizamos Neo4J como dbms para analizar seguidores y seguidos en
          común. <br></br> Aprovechamos una librería de react de neo para
          visualizar los resultados similarmente a cómo están almacenados
        </p>
      </div>
      <h4>Modelado de datos</h4>
      <div>
        <img src="dbms/modelling/neo_basic_structures.jpeg"></img>
      </div>
      <h4>Consultas</h4>
      <ul>
        <li>Cantidad de seguidores en común entre cada par de candidatos</li>
        <li>
          Promedio de candidatos seguidos por usuario<br></br>
          <small>
            (como lo medimos sobre los seguidores de los candidatos debería ser
            un número entre 1 y 10)
          </small>
        </li>
        <li>Usuarios más seguidos por los seguidores de los candidatos</li>
      </ul>
      <h3>Elasticsearch</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          src="dbms/elasticsearch.png"
          width="100"
          height="100"
          style={{ objectFit: "cover" }}
        ></img>
        <p style={{ margin: "12px" }}>
          Utilizamos Elasticsearch como dbms para analizar contenido de los
          tweets de los candidatos <br></br> Aprovechamos una librería de react
          para visualizar los resultados en forma de word cloud.
        </p>
      </div>
      <h4>Modelado de datos</h4>
      <div>
        <img src="dbms/modelling/elastic_basic_settings.png" width="70%"></img>
      </div>
      <div>
        <img src="dbms/modelling/elastic_index_mappings.png" width="70%"></img>
      </div>
      <h4>Consultas</h4>
      <ul>
        <li>Palabras más frecuentes en los tweets agrupados por candidato</li>
      </ul>
    </div>
  );
}
