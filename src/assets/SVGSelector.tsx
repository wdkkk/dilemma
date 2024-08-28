type Props = {
  name: string;
};

const SVGSelector = ({ name }: Props) => {
  switch (name) {
    case "bold":
      return "1";
  }
};

export default SVGSelector;
