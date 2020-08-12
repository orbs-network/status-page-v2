import React, { DetailedHTMLProps } from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}
const useStyles = makeStyles((theme) => ({
  contentFitter: {
    height: "100%",
    width: "fit-content",
    maxWidth: "100%",
  },
}));

export const ContentFitting = React.memo<
  IProps &
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props) => {
  const classes = useStyles();
  const { children, ...others } = props;
  return (
    <div className={classes.contentFitter} {...others}>
      {children}
    </div>
  );
});
