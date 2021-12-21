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
      <hr style={{ class: "solid" }}></hr>
      <h2>Integrantes del grupo</h2>
      <p>
        Agustin Jerusalinsky (60406)<br></br>Agustin Tormakh (60041)<br></br>
        Camila Borinsky (60083)
      </p>
      <hr style={{ class: "solid" }}></hr>
      <h2>Candidatos que analizamos</h2>
      <div style={{ marginInline: "12px" }}>
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
      </div>
      <hr style={{ class: "solid" }}></hr>
      <h2>Persistencia políglota</h2>
      <div style={{ marginInline: "32px" }}>
        <h3>MongoDB</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            src="dbms/mongodb.png"
            width="100"
            height="100"
            style={{ marginRight: "12px", objectFit: "contain" }}
          ></img>
          <p style={{ margin: "12px" }}>
            Utilizamos MongoDB como dbms base para cargar los datos extraídos y
            luego exportarlos a otros motores. <br></br>Además para realizar
            consultas de agregación sobre el <i>engagement</i> de los seguidores
            de los candidatos.
          </p>
        </div>
        <h4>Modelado de datos</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p style={{ margin: "12px" }}></p>
          <img
            style={{ marginRight: "12px", objectFit: "contain" }}
            src="dbms/modelling/mongo_collections.png"
          ></img>
        </div>
        <div className="document-row">
          <img
            src="dbms/modelling/mongo_candidates.png"
            width="300"
            style={{ margin: "12px" }}
          ></img>
          <p>
            Documento ejemplo de la colección <strong>candidates</strong>.{" "}
            <br></br>El campo <strong>_id</strong> indica el username del
            candidato.<br></br> El campo <strong>followers</strong> es la
            cantidad de seguidores del mismo.{" "}
          </p>
        </div>
        <div className="document-row">
          <img
            width="300"
            style={{ margin: "12px", objectFit: "contain" }}
            src="dbms/modelling/mongo_followers.png"
          ></img>
          <p>
            Documento ejemplo de la colección <strong>followers</strong> mapea
            la relación de seguidor a candidato. <br></br> El campo{" "}
            <strong>followed</strong> hace referencia al candidato. <br></br> El
            campo <strong>follower</strong> hace referencia a un id de usuario
            de twitter que sigue al candidato.
          </p>
        </div>
        <div className="document-row">
          <img
            width="300"
            style={{ margin: "12px", objectFit: "contain" }}
            src="dbms/modelling/mongo_following.png"
          ></img>
          <p>
            Documento ejemplo de la colección <strong>following</strong>.
            <br></br> Campo <strong>follower</strong> indica el id de twitter de
            un usuario seguidor de alguno de los candidatos.<br></br>
            Campo <strong>following</strong> hace referencia a otra cuenta de
            twitter a la que sigue este usuario.
          </p>
        </div>
        <div className="document-row">
          <img
            width="300"
            style={{ margin: "12px", objectFit: "contain" }}
            src="dbms/modelling/mongo_tweets.png"
          ></img>
          <p>
            Documento ejemplo de la colección <strong>tweets</strong> con
            bastante información sobre cada tweet extraido de la api de twitter.
            Mencionamos campos más relevantes que usamos para nuestras queries.
            <br></br> Campo <strong>author</strong> indica el candidato que
            escribió el tweet. <br></br> Campo <strong>text</strong> con el
            contenido del tweet.<br></br> Objeto <strong>public_metrics</strong>{" "}
            con las metricas de engagement que utilizamos: <i>retweet_count</i>,{" "}
            <i>reply_count</i>, <i>like_count</i>, <i>quote_count</i>.{" "}
          </p>
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
            Consulta para agrupar por candidato y contar cantidad total,
            promedio por tweet y promedio por tweet dividido por cantidad de
            seguidores de las variables: likes, retweets, replies y quotes
          </li>
        </ul>
        <hr></hr>
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
        <div className="document-row">
          <img width="400" src="dbms/modelling/neo_basic_structures.jpeg"></img>
          <div>
            <h5>3 tipos de nodos distintos:</h5>
            <p>
              Nodo <strong>Candidate</strong> únicamente para los usuarios de
              twitter de los candidatos.<br></br>
              Nodo <strong>User</strong> para representar los usuarios de
              twitter de los cuales solo conocemos su id.<br></br>
              Nodo <strong>Followed</strong> para representar usuarios de
              twitter seguidos por los seguidores de los candidatos,
              distinguidos por su username.<br></br>
              <small>
                (Notar que los 3 nodos representan usuarios de twitter pero les
                pusimos distinto label por el rol que cumplen en nuestro
                sistema)
              </small>
            </p>
            <h5>Relaciones:</h5>
            <p>
              Relación <strong>follows</strong> con nodo origen de label{" "}
              <strong>User</strong> hacia nodos de label{" "}
              <strong>Candidate</strong> y/o <strong>Followed</strong>.<br></br>
              Relación <strong>shared</strong> con nodo origen{" "}
              <strong>Candidate</strong> que representa cantidad de seguidores
              en común con otros nodos de tipo <strong>Candidate</strong> o con
              nodos de tipo <strong>Followed</strong>
            </p>
          </div>
        </div>
        <h4>Consultas</h4>
        <ul>
          <li>Cantidad de seguidores en común entre cada par de candidatos</li>
          <li>
            Promedio de candidatos seguidos por usuario<br></br>
            <small>
              (como lo medimos sobre los seguidores de los candidatos debería
              ser un número entre 1 y 10)
            </small>
          </li>
          <li>Usuarios más seguidos por los seguidores de los candidatos</li>
        </ul>
        <hr></hr>
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
            tweets de los candidatos <br></br> Aprovechamos una librería de
            react para visualizar los resultados en forma de word cloud.
          </p>
        </div>
        <h4>Modelado de datos</h4>
        <div
          className="document-row"
          style={{ justifyContent: "space-evenly" }}
        >
          <img
            src="dbms/modelling/elastic_basic_settings.png"
            width="45%"
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              objectFit: "contain",
            }}
          ></img>

          <img
            src="dbms/modelling/elastic_index_mappings.png"
            style={{ objectFit: "contain" }}
            width="45%"
          ></img>
        </div>
        <h4>Consultas</h4>
        <ul>
          <li>Palabras más frecuentes en los tweets agrupados por candidato</li>
          <li>
            Agregamos un analizador al campo text del índice de tweets que
            filtre por los <i>stopwords</i> de nuestra lengua. tokenizando por
            espacios.
          </li>
        </ul>
      </div>
    </div>
  );
}
