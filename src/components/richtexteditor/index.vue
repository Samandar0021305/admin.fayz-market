<template>
  <ejs-richtexteditor ref="defaultRTE" :height="200">
      <p>The Rich Text Editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.Users can format their content using standard toolbar commands.</p>
  </ejs-richtexteditor>
</template>

<script>
  import {  Toolbar, Link,  Count, HtmlEditor, QuickToolbar } from "@syncfusion/ej2-vue-richtexteditor";

   
  export default {
      provide: {
          richtexteditor:[Toolbar, Link, Count, HtmlEditor, QuickToolbar]
      },
      mounted(){
      const data = document.querySelector("p");
      },
      data(){
        return {}
      }
  }
</script>

<style  >
@import "../../../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css";
@import "../../../node_modules/@syncfusion/ej2-lists/styles/bootstrap5.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css";
@import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap5.css";
@import "../../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/bootstrap5.css";
</style> 







<!-- 
<template>
    <div id="app">
        <div id='container'>
            <br>
            <form id="myForm" class="form-vertical">
            <div class="form-group">
              <ejs-richtexteditor id="defaultRTE"  name="defaultRTE" class="form-control" :placeholder="placeholder" :showCharCount="showCharCount" :created="forms" :change="onChange" :maxLength="maxLength"></ejs-richtexteditor>
              <div class="error-element"></div>
            </div>
            <br/>
            <div class="form-btn-section">
              <ejs-button ref='submitButtonRef' :disabled="true" id="validateSubmit"  >Submit</ejs-button>
              <button id="reset-btn" class="sample-btn e-control e-btn" type="reset" data-ripple="true">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </template>
    <script>
   
    import {  Toolbar, Link, Count, Image, HtmlEditor } from "@syncfusion/ej2-vue-richtexteditor";
    
    export default {
       data: function() {
        return {
          value : null,
          showCharCount: true,
          maxLength: 100,
          placeholder: 'Type something'
            }
        },
    methods: {
         forms() {
          var option = {
            rules: {
              defaultRTE: {
                required: true
              }
            },
            customPlacement: function(element, errorElement) {
              document.querySelector(".error-element").appendChild(errorElement);
            }
          }
          var formObject = new FormValidator('#myForm', option);
         },
         onChange() {
          this.$refs.submitButtonRef.disabled =false;
         }
       },
      provide:{
            richtexteditor:[Toolbar, Link, Image, HtmlEditor, Count]
        }
    };
    </script>
    <style>
    @import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
    @import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
    @import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
    @import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
    @import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
    @import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
    @import "../../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
    
    .error-element {
      margin-top: 5px;
    }
    
    .sample-btn {
      margin-left : 10px;
    }
    
    </style> -->