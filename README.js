const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

app.get("/downloadvideo", async (req, res) => { 
  try {
    let { url, name } = req.query;
    res.header('Content-Type', 'audio/mpeg'); // set header content type to 'audio/mpeg'
    res.header(
      "Content-Disposition", // download video content header as Name: {video name}
      'attachment; filename="' + decodeURI(name) + '.mp3"'
    );
    ytdl(url, {
      filter: "audioonly",
    })
      .pipe(res)
      .on("finish", () => {
        res.send({ Success: true });
      })
      .on("error", (error) => res.status(500).send(error));
  } catch (error) {
    res.send(error);
  }
});
