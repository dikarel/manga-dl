# manga-dl
Download manga from popular scanlation sites via command line

### Supported sites
1. dynasty-scans.com ([sample reader url](http://dynasty-scans.com/chapters/girls_monochrome_ch01#3))
2. mangaeden.com ([sample reader url](https://www.mangaeden.com/en/en-manga/shingeki-no-kyojin/6/1/))
3. mangafox.me ([sample reader url](http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072/1.html))
4. mangapanda.com ([sample reader url](http://www.mangapanda.com/kyou-no-yuiko-san/8/2))
5. mangareader.net ([sample reader url](http://www.mangareader.net/world-trigger/141))
6. Not on this list? [request here](https://github.com/dikarel/manga-dl/issues)

## Install
Download from [npm](http://www.npmjs.com/package/manga-dl).

    $ npm install -g manga-dl

## Download a single chapter
Type the command `manga-dl <reader url>`. A local directory will be created, and pages will be downloaded into that directory.

    $ manga-dl http://www.mangareader.net/world-trigger/141

    Extracting info from http://www.mangareader.net/world-trigger/141...
    Downloading World Trigger chapter 141... (19 pages)
    Done. Check your local directory for downloaded files

Note that the URL has to be that of an online viewer (e.g. [http://www.mangareader.net/world-trigger/142](http://www.mangareader.net/world-trigger/142)); this is the URL where you actually see and flip through the pages.

## Download multiple chapters
Type the command `manga-dl <reader url 1> <reader url 2> ...`. Chapters will be downloaded in the specified order.

    $ manga-dl http://www.mangareader.net/world-trigger/141 http://www.mangareader.net/world-trigger/142 http://www.mangareader.net/world-trigger/140

    Extracting info from http://www.mangareader.net/world-trigger/141...
    Downloading World Trigger chapter 141... (19 pages)
    Extracting info from http://www.mangareader.net/world-trigger/142...
    Downloading World Trigger chapter 142... (19 pages)
    Extracting info from http://www.mangareader.net/world-trigger/140...
    Downloading World Trigger chapter 140... (19 pages)
    Done. Check your local directory for downloaded files

## License

The MIT License (MIT)

Copyright (c) 2016 Darius Karel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.