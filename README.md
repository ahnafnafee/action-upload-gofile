<p align="center">
  <a href="https://gofile.io/">
    <img alt="Gofile.io Logo" src="assets/gofile-logo.png" height="auto" width="200" style="border-radius:20%">
  </a>
</p>

<h1 align="center">
  action-upload-gofile
</h1>

<p align="center">
   A GitHub Action for uploading files to Gofile.io
</p>

<div align="center">
  <a href="https://github.com/ahnafnafee/action-upload-gofile/actions/workflows/main.yml">
		<img src="https://img.shields.io/github/workflow/status/ahnafnafee/action-upload-gofile/action-upload-gofile?logo=github&style=for-the-badge"/>
	</a>
</div>

<div align="center">
  <a href="https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on">
		<img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white"/>
	</a>
  <a href="https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on">
		<img src="https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0"/>
	</a>
  <a href="https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on">
		<img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white"/>
	</a>
</div>

<br />

## Inputs

| Name    | Type   | Description                        |
| ------- | ------ | ---------------------------------- |
| `token` | String | Gofile API access token [optional] |
| `file`  | File   | File to upload on Gofile           |

## Outputs

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `url`    | String | Generated URL     |
| `qrcode` | String | Generated QR Code |

## Environment Variables

The following are _required_ as `step.env` keys

| Name           | Description                                |
| -------------- | ------------------------------------------ |
| `GOFILE_TOKEN` | API token generated from Gofile [optional] |

## Usage

```yaml
steps:
    - name: Upload File
      id: gofile
      uses: ahnafnafee/action-upload-gofile@v2.0.1
      with:
          token: ${{ secrets.GOFILE_TOKEN }}
          file: ./example.webp

    - name: View URL and QR Code
      run: |
          echo "Gofile URL = ${{ steps.gofile.outputs.url }}" 
          echo "Gofile QR Code = ${{ steps.gofile.outputs.qrcode }}"
```

## Credits

This action extends the wonderful work done by [@rnkdsh](https://github.com/rnkdsh) at [rnkdsh/action-upload-diawi](https://github.com/rnkdsh/action-upload-diawi)

## Report Bugs

Report bugs at https://github.com/ahnafnafee/action-upload-gofile/issues.

If you are reporting a bug, please include:

-   Your operating system name and version.
-   Any details about your workflow that might be helpful in troubleshooting.
-   Detailed steps to reproduce the bug.

## License

-   [MIT © 2022 Ahnaf An Nafee](https://github.com/ahnafnafee/action-upload-gofile/blob/master/LICENSE)
-   [MIT © 2019 Ronak Doshi](https://github.com/rnkdsh/action-upload-diawi/blob/master/LICENSE)

## Support

If you feel generous and want to show some extra appreciation:

<p><a href="https://ko-fi.com/ahnafnafee"> <img align="left" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="ahnafnafee" /></a></p>
