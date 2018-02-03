# gifpander

GIF frame expander - split an animated GIF image into a series of static JPG images.

## Installation

### Prerequisites

You must have the [GraphicsMagick](http://www.graphicsmagick.org/) library installed before installing `gifpander`.


```
brew install graphicsmagick
```

### Install

```
git clone git@github.com:micmath/gifpander.git
cd gifpander
npm install -g
```

## Usage

### Input

Run the tool from your command line.

```
gifpander path/to/myimage.gif
```

### Output

Look in the output directory to get the separated images, representing each frame of the animated GIF.

## Options

### Set output image quality (1-100): `--quality`

Optional. Specify the desired compression/quality of the generated JPG files. Acceptable arguments are any number between 1 and 100. Defaults to `50`.

```
gifpander ./fixtures/animated-a.gif --quality=10
```

### Set path to directory where output should be sent: `--out`

Optional. Specify the desired directory to save the generated image files into. Defaults to `./out`.

```
gifpander ./fixtures/animated-a.gif --out=/tmp/images
```
