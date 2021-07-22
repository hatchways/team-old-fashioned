interface Props {
  title: string;
  description: string;
  prizeAmount: number;
  deadline: Date;
  user: string;
  created: Date;
  submissions: { img: string; username: string }[];
}

export default function sampleContestData(): Props {
  return {
    title: 'Full color tattoo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum lorem ut iaculis hendrerit. Cras in ante eu mi accumsan dignissim. Donec finibus mi quis nibh blandit, ac tincidunt lorem pellentesque. Vestibulum convallis accumsan nulla, tristique commodo dolor accumsan sit amet. Aliquam sit amet orci nisi. Pellentesque in eros venenatis, feugiat augue in, tempor sapien. Pellentesque vehicula mauris ac feugiat iaculis. Vivamus non sollicitudin sem. Integer arcu neque, hendrerit vel tristique quis, tincidunt a augue. Quisque et consectetur ex, et tincidunt massa. Phasellus quis justo id erat lobortis lobortis. Sed mi orci, dapibus non auctor quis, lacinia eget massa. Suspendisse mattis id eros nec sodales.',
    prizeAmount: 150,
    deadline: new Date(),
    user: 'kennethstewart',
    created: new Date(),
    submissions: [
      {
        img: 'https://images.unsplash.com/photo-1616315615552-698be1341774',
        username: 'tigranh47',
      },
      {
        img: 'https://images.unsplash.com/photo-1567595747763-457af09b35f2',
        username: 'heftiba',
      },
      {
        img: 'https://images.unsplash.com/photo-1604374376934-2df6fad6519b',
        username: 'oh_gosh',
      },
      {
        img: 'https://images.unsplash.com/photo-1542727365-19732a80dcfd',
        username: 'sincerelymedia',
      },
      {
        img: 'https://images.unsplash.com/photo-1561432868-931a1373efa7',
        username: 'jayson_hinrichsen',
      },
      {
        img: 'https://images.unsplash.com/photo-1612965690978-26034d0cff11',
        username: 'ennil',
      },
      {
        img: 'https://images.unsplash.com/photo-1517705600644-3f392e2d6439',
        username: 'jtylernix',
      },
    ],
  };
}
