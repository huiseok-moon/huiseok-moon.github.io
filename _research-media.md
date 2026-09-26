# Research 영상 추가

연구 내용의 출처: `files/CV_Moon.pdf` (2026년 9월 13일 갱신본), `publications.qmd`. `_cv/CV_Moon.typ`는 현재 PDF와 내용이 달라 최신 연구 내용의 기준으로 사용하지 않는다.
Real-Time Gait Mode Detection 항목의 파이프라인·혼동행렬과 결과 그래프는 사용자가 제공한 이미지를 사용한다. 메인 실험 결과 `videos/Experimental_Video_RT_GMD_Control.mp4`를 먼저 보여주고, 아래 real-life 시나리오 `videos/Various_walking_two.mp4`를 배치한다. 두 영상은 음소거 상태로 자동 반복 재생한다. 기존 개념 도해와 8초 무음 MP4는 저장소에 보존되어 있지만 현재 페이지에서는 사용하지 않는다. 다른 항목은 영상 준비 중 표시를 유지한다.

기존 개념 영상 재생성: Pillow와 imageio-ffmpeg가 설치된 Python으로 `python _make-intent-media.py`. 웹사이트 실행에는 Python이나 추가 라이브러리가 필요하지 않다.

## 권장: YouTube 업로드 후 삽입

1. YouTube Studio에 연구 영상을 업로드하고 공개 또는 일부 공개로 설정한다.
   일부 공개는 링크를 아는 사람이 볼 수 있으므로 비공개 저장 방식은 아니다.
2. 동영상의 퍼가기 허용을 켜고 링크를 복사한다.
3. `research.qmd`의 해당 MP4 삽입을 YouTube 영상으로 바꾼다.
   `VIDEO_ID`와 제목은 실제 영상에 맞게 수정한다. 영상을 여러 개 넣어도 된다.

```markdown
{{< video https://www.youtube.com/watch?v=VIDEO_ID title="Gait recognition demonstration" >}}
```

실제 연구 사진이 생기면 카드 제목의 `.research-thumbnail` 안에 있는 참고 이미지 크롭을 사진으로 교체한다.
예: `[![](images/gait-preview.jpg){alt="Ankle-foot orthosis experiment"}]{.research-thumbnail}`.
참여자가 등장하는 영상은 공개 동의를 확인한다.

## 짧은 MP4 직접 호스팅

`videos/`에 MP4를 넣고 해당 준비 중 블록을 아래 HTML로 교체한다.

```html
<video controls playsinline preload="none" style="width:100%"
       aria-label="Gait recognition demonstration">
  <source src="videos/gait-demo.mp4" type="video/mp4">
  <p><a href="videos/gait-demo.mp4">Download the demonstration video</a>.</p>
</video>
```

음성이 있다면 자막도 제공한다. H.264 MP4를 권장하며 긴 원본은 저장소에 넣지 않는다.

## 용량 제한 (2026-09-22 확인)

- GitHub Pages: 게시 사이트 최대 1 GB, 월 대역폭 소프트 제한 100 GB.
  https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- Git 일반 저장소: 파일당 100 MiB를 초과하는 파일은 차단된다.
  https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
- YouTube: 기본 15분, 계정 인증 후 긴 영상 업로드 가능. 업로드당 최대 256 GB 또는 12시간 중 먼저 도달하는 제한.
  https://support.google.com/youtube/answer/71673
- 일부 공개 설정: https://support.google.com/youtube/answer/157177
- Quarto 영상 문법: https://quarto.org/docs/authoring/videos.html

외부 영상 삽입은 영상 파일이 GitHub Pages의 사이트 용량·전송량을 차지하지 않는다.
`quarto preview`로 확인하고 기존 GitHub Actions 배포 절차를 사용한다.
