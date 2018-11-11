Sound Generations with Dynne.md
===============================

Although Freesound has many high-quality sound samples for live coding
and DJing, sometimes you want to algorithmically generate a sound instead.

The classic example is white noise, which is you can create just by
filling a buffer with random floating-point values using your
favorite language's random number generator.

In this case, your favorite language is Clojure, and the
[Dynne package](https://github.com/candera/dynne)
is your friend.

# Running Dynne Example

Create a new Lein project

```
lein new whitenoise
```

Change into that directory, and create a `project.clj` with the dependency.

```
(defproject whitenoise "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [
                 [org.clojure/clojure "1.8.0"]
                 [org.craigandera/dynne "0.4.1"]
                 ])
```

Then start a repl, and enter in the lines from the example line-by-line.

```
user=> (require '[dynne.sampled-sound :refer :all])
WARNING: update already refers to: #'clojure.core/update in namespace: incanter.core, being repla
ced by: #'incanter.core/update
nil                                                                                              user=> (def s (sinusoid 1.0 440))                                                                #'user/s                                                                                         user=> (visualize s)
#object[org.jfree.chart.ChartFrame 0x422a7846 "org.jfree.chart.ChartFrame[frame0,0,0,500x400,layo
ut=java.awt.BorderLayout,title=Incanter Plot,resizable,normal,defaultCloseOperation=DISPOSE_ON_CL
OSE,rootPane=javax.swing.JRootPane[,0,22,500x378,layout=javax.swing.JRootPane$RootLayout,alignmen
tX=0.0,alignmentY=0.0,border=,flags=16777675,maximumSize=,minimumSize=,preferredSize=],rootPaneCh
eckingEnabled=true]"]                                                                            user=> (visualize (trim s 0 0.01))                                                               #object[org.jfree.chart.ChartFrame 0x5dda674f "org.jfree.chart.ChartFrame[frame1,0,0,500x400,layout=java.awt.BorderLayout,title=Incanter Plot,resizable,normal,defaultCloseOperation=DISPOSE_ON_CL
OSE,rootPane=javax.swing.JRootPane[,0,22,500x378,layout=javax.swing.JRootPane$RootLayout,alignmen
tX=0.0,alignmentY=0.0,border=,flags=16777673,maximumSize=,minimumSize=,preferredSize=],rootPaneCh
eckingEnabled=true]"]
user=> (play s)
{:player #future[{:status :pending, :val nil} 0x60204cf2], :stop #function[dynne.sampled-sound/play/fn--31058], :q #object[java.util.concurrent.LinkedBlockingQueue 0x7c1ee546 "[]"], :provider #future[{:status :pending, :val nil} 0x6c5a0bc2], :sdl #object[com.sun.media.sound.DirectAudioDevice$DirectSDL 0x7f07bb32 "com.sun.media.sound.DirectAudioDevice$DirectSDL@7f07bb32"]}
user=> (play s)
{:player #future[{:status :pending, :val nil} 0x57e7adfd], :stop #function[dynne.sampled-sound/play/fn--31058], :q #object[java.util.concurrent.LinkedBlockingQueue 0x1925ba2a "[]"], :provider #future[{:status :pending, :val nil} 0x74d310dd], :sdl #object[com.sun.media.sound.DirectAudioDevice$DirectSDL 0x5c48c184 "com.sun.media.sound.DirectAudioDevice$DirectSDL@5c48c184"]}
user=> (play s)
{:player #future[{:status :pending, :val nil} 0x338f89b1], :stop #function[dynne.sampled-sound/pl
ay/fn--31058], :q #object[java.util.concurrent.LinkedBlockingQueue 0x2fcdf385 "[]"], :provider #f
uture[{:status :pending, :val nil} 0x5ca5b15c], :sdl #object[com.sun.media.sound.DirectAudioDevic
e$DirectSDL 0x55a16102 "com.sun.media.sound.DirectAudioDevice$DirectSDL@55a16102"]}
user=> (def s2 (fade-in s 0.5))
#'user/s2
user=> (visualize s2)                                                                            #object[org.jfree.chart.ChartFrame 0x5d901388 "org.jfree.chart.ChartFrame[frame2,0,0,500x400,layout=java.awt.BorderLayout,title=Incanter Plot,resizable,normal,defaultCloseOperation=DISPOSE_ON_CLOSE,rootPane=javax.swing.JRootPane[,0,22,500x378,layout=javax.swing.JRootPane$RootLayout,alignmen
tX=0.0,alignmentY=0.0,border=,flags=16777673,maximumSize=,minimumSize=,preferredSize=],rootPaneCh
eckingEnabled=true]"]
user=> (play s2)
{:player #future[{:status :pending, :val nil} 0x2bbd7c51], :stop #function[dynne.sampled-sound/pl
ay/fn--31058], :q #object[java.util.concurrent.LinkedBlockingQueue 0x7a937915 "[]"], :provider #f
uture[{:status :pending, :val nil} 0x54c7126e], :sdl #object[com.sun.media.sound.DirectAudioDevic
e$DirectSDL 0xbcfa2b0 "com.sun.media.sound.DirectAudioDevice$DirectSDL@bcfa2b0"]}
user=> (ffirst (chunks s2 16000))
#object["[D" 0x56c157d "[D@56c157d"]
user=> (def l (-> (sinusoid 3.0 440)
  #_=> (fade-in 1.5)))
#'user/l
user=> (play l)
{:player #future[{:status :pending, :val nil} 0x2c072cdc], :stop #function[dynne.sampled-sound/pl
ay/fn--31058], :q #object[java.util.concurrent.LinkedBlockingQueue 0x922ddf8 "[]"], :provider #fu
ture[{:status :pending, :val nil} 0x6fd43e], :sdl #object[com.sun.media.sound.DirectAudioDevice$D
irectSDL 0x761c7110 "com.sun.media.sound.DirectAudioDevice$DirectSDL@761c7110"]}
user=> (def r (-> (square-wave 3.0 880)
  #_=> (fade-out 1.5)))
#'user/r
user=> (play r)
{:player #future[{:status :pending, :val nil} 0x6e9f0f84], :stop #function[dynne.sampled-sound/pl
ay/fn--31058], :q #object[java.util.concurrent.LinkedBlockingQueue 0x5d371ae8 "[]"], :provider #f
uture[{:status :pending, :val nil} 0x635730cb], :sdl #object[com.sun.media.sound.DirectAudioDevic
e$DirectSDL 0x8099215 "com.sun.media.sound.DirectAudioDevice$DirectSDL@8099215"]}
user=> (def s3 (-> (->stereo l r)
  #_=> (pan 0.3)))
#'user/s3
user=> (play s3)
{:player #future[{:status :pending, :val nil} 0x6d23cfd8], :stop #function[dynne.sampled-sound/pl
ay/fn--31058], :q #object[java.util.concurrent.LinkedBlockingQueue 0x329137d3 "[]"], :provider #f
uture[{:status :pending, :val nil} 0x1f02f480], :sdl #object[com.sun.media.sound.DirectAudioDevic
e$DirectSDL 0x1e9aef68 "com.sun.media.sound.DirectAudioDevice$DirectSDL@1e9aef68"]}
user=> (play s3)
{:player #future[{:status :pending, :val nil} 0x25389cd3], :stop #function[dynne.sampled-sound/pl
ay/fn--31058], :q #object[java.util.concurrent.LinkedBlockingQueue 0x3c8e05a "[]"], :provider #fu
ture[{:status :pending, :val nil} 0x15dde6e0], :sdl #object[com.sun.media.sound.DirectAudioDevice
$DirectSDL 0x10e837d "com.sun.media.sound.DirectAudioDevice$DirectSDL@10e837d"]}
user=> (save s3 "sample.wav" 44100)
529244
user=> (def s4 (read-sound "sample.wav"))
#'user/s4
user=> (def s5 (fn-sound 2.0 2 (fn ^double [^long c ^double t] (- (rand 2.0) 1.0))))
#'user/s5
user=> (play (gain s5 0.1))
{:player #future[{:status :pending, :val nil} 0x7459aca], :stop #function[dynne.sampled-sound/pla
y/fn--31058], :q #object[java.util.concurrent.LinkedBlockingQueue 0x468ae218 "[]"], :provider #fu
ture[{:status :pending, :val nil} 0x55344bb9], :sdl #object[com.sun.media.sound.DirectAudioDevice
$DirectSDL 0x2264dbd0 "com.sun.media.sound.DirectAudioDevice$DirectSDL@2264dbd0"]}
user=> (save s5 "whitenoise.wav 44100)
  #_=>

user=> (save s5 "whitenoise.wav" 44100)
352844
user=>
```
