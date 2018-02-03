#!/usr/bin/env node
'use strict';

const path = require('path');
const OUTDIR_DEFAULT = path.join(__dirname, 'out');
const IMGQUAL_DEFAULT = 50;

const yargs = require('yargs');

var argv = yargs
    .usage('$0 <image>')
    .option('out', {
        alias: 'o',
        describe: 'Set path to directory where output should be sent',
        default: OUTDIR_DEFAULT
    })
    .option('quality', {
        alias: 'q',
        default: IMGQUAL_DEFAULT,
        describe: 'Set output image quality (1-100)'
    })
    .alias('help', 'h')
    .alias('version', 'v')
    .argv;

const status = require('elegant-status');
const gm = require('gm'); // or maybe: const im = gm.subClass({ imageMagick: true });
const fs = require('fs');
const mkdirp = require('mkdirp');

(function main() {
    let opts;
    let image;

    try {
        opts = config();
        if (opts) image = gm(opts.imgPath);
    }
    catch(err) {
        console.error(err.message);
    }
    
    if (image) expand(image, opts)
    .catch(err => {
        console.error(err.message);
    });
})();

/**
 * Build the options for things that can be configured.
 * @returns {object}
 */
function config() {
    const imgPath = argv._[0];
    const imgQual = argv.q;
    const outDir = argv.o;

    if ( !imgPath ) {
        throw new Error( 'Missing required argument: <image>' );
    }

    if ( !/\.gif$/i.test(imgPath.toString()) ||  !fs.existsSync(imgPath) ) {
        throw new Error('Unable to find a GIF file at the path given in your <image> argument: ' + imgPath);
    }

    return {
        imgPath: imgPath,
        imgQual: imgQual,
        outDir: outDir
    };
}

/**
 * Break a single GIF file up into a series of JPG files, one for each frame of the animation.
 * @param {object} image - An object generated via call to gm()
 * @param {object} opts - An object generated via call to config()
 */
function expand(image, opts) {
    let outName = path.basename(opts.imgPath).replace(/\.gif$/i, '-%02d.jpg');
    let outPathName = path.join(opts.outDir, outName);

    if (!fs.existsSync(opts.outDir)) {
        console.log(`Out dir does not exist, creating at: ${opts.outDir}`);
        mkdirp.sync(opts.outDir);
    }

    let done = status(`Expanding GIF to ${outPathName} ...`);

    return new Promise( (resolve, reject) => {
        image
        .coalesce()
        .out('+adjoin')
        .compress()
        .out('JPEG')
        .quality( opts.imgQual )
        .write(outPathName, function(err) {
            done(true);
            if (err) reject(err);
            else resolve();
        });
    });
}
