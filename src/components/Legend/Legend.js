import React from "react";
import classes from "./Legend.css";
import Draggable from "react-draggable";

const Legend = props => {
  const { data, direction, style } = props;
  return (
    <div
      className={classes.Legend}
      style={{
        ...style,
        flexDirection: direction === "row" ? "row" : "column"
      }}
    >
      {data.map(group => {
        return (
          <Draggable
            disabled={!group.isDraggable}
            axis="both"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
          >
            <div
              className={[classes.legendsContainer, "handle"]}
              style={{
                ...group.style,
                ...(group.isDraggable && { cursor: "grab" })
              }}
            >
              <h3 className={classes.legendsTitle}>{group.title}</h3>
              <div
                className={classes.legendsGroup}
                style={{
                  flexDirection: "column"
                }}
              >
                {group.colors.map(legend => (
                  <div
                    className={classes.legend}
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <div
                      className={classes.legendBox}
                      style={{
                        backgroundColor: legend.color,
                        ...group.cellStyle
                      }}
                    />
                    <p className={classes.legendText} style={group.textStyle}>
                      {legend.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default Legend;
