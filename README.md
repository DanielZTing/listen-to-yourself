## Inspiration
I was inspired by [xkcd 481: Listen to Yourself](https://xkcd.com/481/), which is the namesake of this project. In the comic, a person is about to post a comment on YouTube but after hearing it read out loud back to him, realizes they are, in their own words, a moron.

## What it does
We have all had experience with nasty Internet comments and may be guilty of making some ourselves. When you can hide behind a pseudonym, you can find yourself using language you would never dare say out loud in real life to another human being's face. This browser extension simply ~~forces~~ encourages you to be more mindful of what you say online by reading it out loud to you. It also highlights words that could be unproductive or pointlessly toxic: the Caring part of RESPEC's core values of PACT (Passion, Accountability, Caring, and Teamwork). This hopefully makes you more self-aware of what you say through a keyboard and build others up instead of tearing them down. A share button records how long you spent listening to a certain piece of text, which you can share on social media to promote mutual Accountability.

## Hacking
Open `chrome://extensions`, enable developer mode, click load unpacked, and select the repository folder. Unfortunately it does not work on Firefox right now because Mozilla has not implemented Manifest V3 yet.

## How we built it
This leverages the cross-platform [WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) API to inject a content script that modifies the behavior of select social media sites so that the user must hear their own writing before being allowed to post.

## Challenges we ran into
The hardest part was probably highlighting the text in real time as it is being spoken and just making sure the extension's functionality integrates properly with the site and doesn't break anything.

## Accomplishments that we're proud of
I am pretty proud of styling the reader like the site it is on to provide an experience that feels more native and the smooth animations that add that tiny bit of extra polish. The reader samples its font family and background color from the original page so it fits right in place.

## What we learned
I learned how to animate elements with CSS and using the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to generate the text-to-speech.

## What's next for Listen to Yourself
I would definitely like to expand support for more sites. The code is modular enough that only a small number of lines is needed to integrate it into another site but since every website has their own unique design it does require a little work. In addition, I could employ some sort of sentiment analysis to highlight toxic speech instead of the simple hardcoded list I'm using right now. Lastly, if there turns out to be real demand for this, I could backport it to Manifest V2 to support Firefox.
