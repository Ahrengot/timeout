"use strict"

class RafTimeout
	constructor: ( @cb, @delay, @args, @context ) ->
		@startTime = new Date().getTime()
		@lastUpdate = @startTime

		return console.error "Browser doesn't support RequestAnimationFrame" if not @setAnimFrame()
		@tick()
	setAnimFrame: ->
		@reqAnimFrame = window.requestAnimationFrame
		@cancelAnimFrame = window.cancelAnimationFrame

		prefixes = ["ms", "moz", "webkit", "o"]
		i = prefixes.length
		while i-- > -1 and !@reqAnimFrame
			@reqAnimFrame = window[ "#{ prefixes[i] }RequestAnimationFrame" ]
			@cancelAnimFrame = window[ "#{ prefixes[i] }CancelAnimationFrame" ] or window[ "#{ prefixes[i] }CancelRequestAnimationFrame" ]

		return if @reqAnimFrame then true else false
	tick: =>
		@lastUpdate = new Date().getTime()
		@time = ( @lastUpdate - @startTime )

		if @time < @delay
			@reqAnimFrame.call( window, @tick )
		else
			@cb.apply( @context, @args )

class RafInterval extends RafTimeout
	tick: ->
		return console.error "RafInterval is not yet implemented."
		# console.log "Tick from interval"
		# super




window.timeout = (callback, delay = 1000, args = [], context = @) ->
	return new RafTimeout( callback, delay, args, context )

window.interval = (callback, delay = 1000, args = [], context = @) ->
	return new RafInterval( callback, delay, args, context )