<!-- Glossary Menu Begin -->

<div class='glossarymain'>
<div class='navmenu'>
		<ul class="nav nav-list" id="myTab">
		<li class="nav-header">Glossary Index</li>
		  <li class="active"><a href="#AC">A-C</a></li>
		  <li><a href="#DF">D-F</a></li>
		  <li><a href="#GJ">G-J</a></li>
		  <li><a href="#KN">K-N</a></li>
		  <li><a href="#OR">O-R</a></li>
		  <li><a href="#SV">S-V</a></li>
		  <li><a href="#WZ">W-Z</a></li>
		</ul>
</div>
<div class='content contentmargin'>	
<div class="tab-content" markdown="1">
<div class="tab-pane active" id="AC" markdown="1">

<!-- Glossary Menu End -->

### Accessor
A script that monitors, modifies, or intercepts property get or set operations.


### Action
State change executed by the kernel.


### Application
A component loaded as the top definition of a VWF instance. 


### Behavior
A fractional component that adds functionality to a component.


### Bubbling
Flowing an object up to the previous method calls until it either reaches the top or it reaches a method that is implemented to handle it.


### Capturing
Means of gathering specific data


### Catalog
A listing of applications and components.


### Child
A node that is spawned by an existing node that is hierarchically higher.


### Client
Connection to the reflector.du


### Component
A piece of a VWF application, serving as a prototype, behavior, child, or the application itself. Components are stored collections of configured nodes.


</div>

<div class="tab-pane" id="DF" markdown="1">

### Dispatched Event
Event that captures down and bubbles up all the path from the application root to the target node.


### Driver
Module that extends the kernel.


### Event
Outgoing function call.


### Event Data
Data delivered to all nodes for a dispatched event.


### Event Node Data
Data delivered per node for a dispatched event.


### Future
Method call that will be triggered in a certain amount of time specified by the parameter


</div>
<div class="tab-pane" id="GJ" markdown="1">

### ID
Unique identifier that is used to represent objects


</div>
<div class="tab-pane" id="KN" markdown="1">

### Kernel
Machinery that creates the application environment.


### Member
Property, method, event, or child of a node that an action is executed on.


### Method
Incoming function call.


### Model
Driver that executes within the shared state.


### Module
The kernel (future), drivers, and supporting libraries (future) are JavaScript modules in loaded on demand. Modules are in the RequireJS format.


### Node
The atomic unit of a VWF application. Nodes maintain state in properties, provide methods for incoming function calls, provide events for outgoing function calls, reference child nodes, and contain scripts to glue the pieces together.


</div> 

<div class="tab-pane" id="OR" markdown="1">

### Parent
A node that has knowledge of exactly one hierarchically higher node and multiple child nodes.


### Property
Node state


### Prototype
A component that provides base functionality for a component.


### Reflector
Server managing an instance, synchronizing state, and ticking time.


</div>
<div class="tab-pane" id="SV" markdown="1">

### Scripts
A collection of property and function definitions.


### Time
Quantized forward progression generated by the reflector.


### View
Driver that executes outside of the shared state.


</div>
<div class="tab-pane" id="WZ" markdown="1">
No entries at this time.
</div>
</div>

<script type="text/javascript">
  $(function () {
    $('#myTab a:first').tab('show');
  });
  $('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})
</script>

</div>
</div>












