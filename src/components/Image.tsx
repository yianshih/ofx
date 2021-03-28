import React from "react"

const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  ...props
}) => {
  return <img {...props} alt={props?.alt || "img"} />
}

export default Image
