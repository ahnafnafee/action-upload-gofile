<div align="center">
  📦
</div>
<h1 align="center">
  action-upload-gofile
</h1>

<p align="center">
   A GitHub Action for uploading files to Gofile.io
</p>

<div align="center">
  <a href="https://github.com/ahnafnafee/action-upload-gofile/actions/workflows/main.yml">
		<img src="https://github.com/ahnafnafee/action-upload-gofile/actions/workflows/main.yml/badge.svg?branch=main"/>
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

## Example

```yaml
uses: ahnafnafee/action-upload-gofile@v1
with:
    token: ${{ secrets.GOFILE_TOKEN }}
    file: ./example.webp
```

## Disclaimer

This action extends the wonderful work done by [@rnkdsh](https://github.com/rnkdsh) at [rnkdsh/action-upload-diawi](https://github.com/rnkdsh/action-upload-diawi)
