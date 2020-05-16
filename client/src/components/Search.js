import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import ListItem from "@material-ui/core/ListItem";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  listItem: {
    justifyContent: "center",
  },
  listImage: {
    width: "100%",
    maxWidth: "460px",
  },
}));

const bannedWordList = [
  "",
  " ",
  "a",
  "and",
  "or",
  "the",
  "to",
  "#",
  "!",
  "@",
  "'",
  '"',
  "!",
  "@",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  ",",
  ".",
  "?",
  "/",
  "`",
  "~",
];

export default function FullWidthGrid(props) {
  const queryString = props.match.params.queryString;
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchData = async () => {
      try {
        const response = await fetch("/api/all", { signal: signal });
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        const values = Object.values(data);
        const isInt = isNaN(parseInt(queryString, 10)) ? false : true;

        let matches = [];
        let intTerm = new RegExp(`^${queryString}$`, "im");

        for (let i = 0; i < values.length; i++) {
          if (isInt) {
            const match = values[i].appid.toString().match(intTerm);
            if (match) {
              matches.push(values[i]);
            }
          } else {
            const terms = queryString.split(" ");
            for (let j = 0; j < terms.length; j++) {
              if (bannedWordList.includes(terms[j].toLowerCase()) || !isNaN(parseInt(terms[j], 10))) {
                continue;
              }
              const match = values[i].name.match(new RegExp(`${terms[j]}`, "im"));
              if (match) {
                matches.push(values[i]);
                break;
              }
            }
          }
        }

        setSearchResults(matches);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [queryString]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              {searchResults.length > 0 ? (
                <>
                  <Typography variant="h6" align="center">
                    Search Results
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h6" align="center">
                    No Search Results Found
                  </Typography>
                  {/* <Skeleton animation="wave" /> */}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        {searchResults.length > 0 ? (
          <>
            {searchResults.map((result) => (
              <Grid item xs={12} sm={6} lg={3} xl={2} key={result.appid}>
                <Card>
                  <CardActionArea>
                    <ListItem
                      disableGutters={true}
                      component="a"
                      href={`/game/${result.appid}`}
                      className={classes.listItem}
                      cols={1}
                    >
                      <img
                        className={classes.listImage}
                        src={`https://steamcdn-a.akamaihd.net/steam/apps/${result.appid}/header.jpg?t=1568751918`}
                        alt={result.name}
                      />
                    </ListItem>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
}