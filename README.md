# AjaxUploader
JS AJAX File Upload with Progress

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://github.com/aMahmoodi/AjaxUploader/raw/master/jquery.ajaxuploader.min.js
[max]: https://github.com/aMahmoodi/AjaxUploader/raw/master/jquery.ajaxuploader.js

In your web page:

```html
<!-- load "jQuery" and "jquery.ajaxuploader" -->
<form action="" method="post">
    <input type="file" name="file"/>
    <!-- ... -->
</form>
<div id="progress"></div>

<script type="text/javascript">
	
    $('[name="file"]').ajaxUploader({
        url: "...",
        data: {foo : 'bar'},
        dataType: 'json',
        success: function (data, status){
            console.log(data);

        },
        progress: function(data){
            console.log(data.percent);

        }
    });
</script>
```


## Options

| Option 	    | Default Value  | Description |
|:--------------|:--------------:|:------------|
| url           | **""**             | **{String}** Request mapping to back-end service that handles the upload and returns a response.
| data          | **{}**             | **{Object}** Additional data you would like to pass along with the request.
| dataType      | **"html"**         | **{String}** The data type you are using to communicate with the server. Currently *"json"*, *"xml"*, *"text"* and *"html"* are supported.


## Callbacks
| Name            | Description |
|:----------------|:------------|
| success:        | (data, file, xhr) Fires on successful ajax response.
| error:          | (data, file, xhr) Fires when there is an error. 
| progress:       | (done, total, percent) Fires as the upload progresses. This can be used to create progress bars.
| load:           | (file, xhr) Fires when the upload process begins.
| complete:       | (file, xhr) Fires when the upload process ends.
