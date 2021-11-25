import "./DogList.css";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"; 

export default function App() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/30")
      .then((res) => res.json())
      .then((body) => {
        setList(body.message);
      });
  }, []);

  useEffect(() => {
    const listCpy = list;

    setList(listCpy.filter((item) => item.includes(filter)));
  }, [filter]);

  const handleChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };
  return (
    <div className="App">
      <Typography variant="h3" component="div" gutterBottom>
        Dog Gallery
        <br />
        <TextField
          id="standard-basic"
          label="Filter"
          variant="standard"
          value={filter}
          onChange={handleChange}
        />
      </Typography>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {list.map((link, index) => (
          <Grid item sm={4} md={4} key={index} style={{ textAlign: "justify" }}>
            <img src={link} style={{ width: "200px", height: "200px" }} />
            <div>{link.split("/")[4]}</div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
