funcss
======
A javascript solution to use dynamic css classes

======

### Usage

my_style.css

    .my_class(){
    color:red;
    font-size:$0px;
    }
    
my_page.html

    <script>
      funcssLoad("my_style.css");
    </script>
    <h3 class="my_class(30)">A big red text</h3>
    
  
