import { useEffect, useState } from "react";

export default function App() {
  const [channel, setChannel] = useState({
    r: "",

    g: "",

    b: "",

    a: "",
  });

  const [bg, setBg] = useState();

  const [alpha, setAlpha] = useState(1);

  const randomColor = () => {
    const rgb = {};

    rgb.r = Math.floor(Math.random() * 256);

    rgb.g = Math.floor(Math.random() * 256);

    rgb.b = Math.floor(Math.random() * 256);

    return rgb;
  };

  const toggle = () => {
    const color = randomColor();

    setChannel(color);

    setBg(`rgb(${color.r},${color.g},${color.b},${alpha})`);
  };

  const opacity = () => {
    setBg(`rgb(${channel.r},${channel.g},${channel.b},${alpha})`);
  };

  useEffect(() => {
    document.body.style.backgroundColor = bg;
  }, [bg, alpha]);

  console.log(bg);

  return (
    <>
      <h1>Random color generator</h1>

      <button onClick={toggle}>Change</button>

      <br />

      <input
        type="range"
        min={1}
        max={10}
        onChange={(e) => {
          setAlpha(parseInt(e.target.value) / 10);

          opacity();
        }}
      />
    </>
  );
}
