"""Build original conceptual media; not recorded motion or experimental data.
Run with Pillow and imageio-ffmpeg installed: python _make-intent-media.py
"""
from pathlib import Path
from math import sin, cos, pi
import subprocess
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent
FONT = '/System/Library/Fonts/Supplemental/Arial.ttf'
BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
W, H, FPS, SECONDS = 960, 540, 24, 8

def frame(t):
    im = Image.new('RGB', (W,H), '#101e2b')
    d = ImageDraw.Draw(im)
    def text(x,y,s,size=20,color='#dbe8ee',bold=False):
        d.text((x,y),s,font=ImageFont.truetype(BOLD if bold else FONT,size),fill=color)
    text(40,30,'HUMAN INTENTION DETECTION',16,'#73d8c5',True)
    text(40, 62,'From movement to context',34,bold=True)
    text(40,112,'A conceptual view of wearable sensing and recognition',18,'#9bb0c0')
    for x in [40,342,644]:
        d.rounded_rectangle((x,166,x+276,453),radius=16,fill='#1a2c3c')
    text(60,185,'01  SENSE',16,'#73d8c5',True)
    text(362,185,'02  READ A SEQUENCE',16,'#73d8c5',True)
    text(664,185,'03  INFORM ASSISTANCE',15,'#73d8c5',True)
    phase=2*pi*t
    hip=(173,326); shoulder=(175,263)
    d.ellipse((159,225,191,257),fill='#edf4f7')
    def line(points,color='#edf4f7',width=9): d.line(points,fill=color,width=width,joint='curve')
    line([shoulder,hip])
    for sign,color in [(-1,'#6e8599'),(1,'#edf4f7')]:
        knee=(hip[0]+sign*31*sin(phase),366)
        foot=(hip[0]+sign*47*sin(phase+.35),414-14*max(0,sign*cos(phase)))
        line([hip,knee,foot,(foot[0]+18,foot[1])],color)
        line([shoulder,(175-sign*28*sin(phase),304),(175-sign*42*sin(phase),328)],color,7)
        d.rounded_rectangle((foot[0]-5,foot[1]-10,foot[0]+12,foot[1]+1),radius=3,fill='#73d8c5')
    d.line((62,431,292,431),fill='#456071',width=2)
    for row,color in enumerate(['#73d8c5','#75ace8','#dfb986']):
        y=267+row*49
        points=[(362+i,y+12*sin(i*.058-phase+row)+4*sin(i*.15+phase)) for i in range(230)]
        d.line(points,fill=color,width=3)
    d.rounded_rectangle((516,242,590,387),radius=6,outline='#dbe8ee',width=2)
    text(362,407,'Illustrative sensor signals',16,'#9bb0c0')
    for i,s in enumerate(['Movement context','Recognition model','Robot controller']):
        y=242+i*60
        active=int(t/SECONDS*3)%3 == i
        d.rounded_rectangle((664,y,900,y+44),radius=8,fill='#285349' if active else '#243b4e')
        text(678,y+11,s,18,'#baf1e3' if active else '#a8bccb')
    text(40,487,'CONCEPT ANIMATION  /  Synthetic motion and signals; not experimental results.',16,'#9bb0c0')
    return im

if __name__=='__main__':
    (ROOT/'videos').mkdir(exist_ok=True)
    poster=frame(.35)
    poster.save(ROOT/'images/intent-poster.jpg',quality=90)
    out=ROOT/'videos/intent-concept.mp4'
    cmd=[imageio_ffmpeg.get_ffmpeg_exe(),'-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',str(out)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=subprocess.DEVNULL)
    for i in range(FPS*SECONDS): proc.stdin.write(frame(i/FPS).tobytes())
    proc.stdin.close()
    assert proc.wait()==0 and out.stat().st_size>1000
    probe=subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-i',str(out),'-f','null','-'],capture_output=True,text=True)
    assert probe.returncode==0 and 'Audio:' not in probe.stderr and '960x540' in probe.stderr
    print(f'PASS: {SECONDS}s silent 960x540 MP4, {out.stat().st_size/1024:.0f} KB')
