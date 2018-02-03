# gifpanda

Expand the seperate frames of an animated GIF into a series of static JPG images.

## Install

*NB you must have the [GraphicsMagick](http://www.graphicsmagick.org/) library installed before installing gifpanda.*

```
brew install graphicsmagick
```

Then...

```
git clone git@github.com:micmath/gifpanda.git
cd gifpanda
npm install -g
```

## Usage

### Input

Run the tool from your command line.

```
gifpanda path/to/myimage.gif
```

### Output

Look in the output directory to get the JPG images representing each frame of the animated gif.

## Options

### Output image quality: `--quality`

Optional. Specify the desired quality of the generated JPG files. Acceptable arguments are any number between 1 and 100. Defaults to `50`.

```
gifpanda ./fixtures/animated-a.gif --quality=10
```

### Output directory: `--out`

Optional. Specify the desired directory to save the generated JPG files into. Defaults to `./out`.

```
gifpanda /fixtures/animated-a.gif --out=/tmp/images
```
