(function (window, document) {
    window.Parallax = function (items, optionsSet) {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.elementDom = document.querySelectorAll(items);
        this.itemsNodelist = Array.prototype.slice.call(this.elementDom);
        this.objectParalaxItems = [];

        this.clientX = '';
        this.clientY = '';
        this.defaultOptions = {
            typeParallax: 'parallaxMove',
            wrapperParentParallax: 'body'
        };
        this.changeOptions(optionsSet);
    };
    Parallax.prototype = {
        init: function () {
            this.createOptions();
            this.mouseMoveEvent(this.getTypeSelector());
        },
        cursorPosition: function (e) {
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.updatePosition(e);
        },
        updatePosition: function (e) {
            var self = this;
            this.objectParalaxItems.forEach(function (item) {
                self[self.defaultOptions.typeParallax](e, item.el, item.options.depth);
            })
        },
        createOptions: function (e) {
            this.objectParalaxItems = this.itemsNodelist.map(function (item) {
                return {
                    el: item,
                    options: {
                        depth: +item.getAttribute('data-depth')
                    }
                }
            });
        },
        changeOptions: function (optionsSet) {
            var self = this;
            var objectOptions = optionsSet.options;
            for (var option in objectOptions) {
                for (var def in self.defaultOptions) {
                    if (option === def) {
                        self.defaultOptions[option] = objectOptions[option];
                    }
                }
            }
        },
        parallaxMove: function (e, obj, speed) {
            var self = this;
            var positionXPlus,
                positionYPlus;
            positionXPlus = (self.clientX - self.windowWidth / 2);
            positionYPlus = (self.clientY - self.windowHeight / 2);
            obj.style.transform = 'translate3d(' + positionXPlus * speed + 'px, ' + positionYPlus * speed + 'px, 0px)';
        },
        mouseMoveEvent: function (typeDocumentSelector) {
            var self = this;
            var parallaxWrapper = document[typeDocumentSelector](self.defaultOptions.wrapperParentParallax);

            if (parallaxWrapper === null) {
                return this.catchError('You don`t have this element in DOM');
            }

            parallaxWrapper.addEventListener('mousemove', function (evt) {
                self.cursorPosition(evt);
            }, true);
        },
        getTypeSelector: function () {
            var getFirstElement = this.defaultOptions.wrapperParentParallax.slice(0, 1);
            switch (getFirstElement) {
                case '.':
                    return 'querySelector';
                case '#':
                    return 'getElementById';
                default:
                    return 'querySelector'
            }
        },
        catchError: function (error) {
            console.error('This message error --------->> ' + error);
        }
    };
})(window, window.document);

var parallax = new Parallax('.js-parallax', {
    options: {
        typeParallax: 'parallaxMove',
        wrapperParentParallax: '.main-page'
    }
});
parallax.init();