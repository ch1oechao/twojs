var el = document.getElementById('main');

var two = new Two({
	fullscreen: true
});

two.appendTo(el);

var cenX = document.body.offsetWidth / 2;
var cenY = document.body.offsetHeight / 2;

var earthAngle = 0,
		moonAngle  = 0,
		distance   = 30,
		radius     = 50,
		padding    = 100,
		orbit      = 200,
		orbits     = two.makeGroup();

// 地球轨道
var earthOrbit = two.makeCircle(cenX, cenY, orbit);
earthOrbit.noFill();
earthOrbit.linewidth = 4;
earthOrbit.stroke = '#fff';
orbits.add(earthOrbit);

// 地球球体
var pos = getPosition(earthAngle++, orbit),
		earth = two.makeCircle(pos.x + cenX, pos.y + cenY, radius);
earth.stroke = '#123456';
earth.lineWidth = 4;
earth.fill = '#194878';

// 月球轨道
var moonOrbit = two.makeCircle(earth.translation.x, earth.translation.y,
	radius + distance);
moonOrbit.noFill();
moonOrbit.lineWidth = 4;
moonOrbit.stroke = '#ccc';
orbits.add(moonOrbit);

// 月球球体
var pos = getPosition(moonAngle, radius + distance),
		moon = two.makeCircle(earth.translation.x + pos.x, earth.translation.y + pos.y, radius / 4);
moon.noStroke();
moon.fill = '#FF8000';


two.bind('update', function(frameCount){
	// 地球旋转位置
	var pos = getPosition(earthAngle++, orbit);
	earth.translation.x = pos.x + cenX;
	earth.translation.y = pos.y + cenY;

	//月球旋转位置
	var moonPos = getPosition(moonAngle++, radius + distance);
	moon.translation.x = earth.translation.x + moonPos.x;
	moon.translation.y = earth.translation.y + moonPos.y;
	moonAngle++;

	// 月球轨迹旋转位置 - 地球球体旋转位置
	moonOrbit.translation.x = earth.translation.x;
	moonOrbit.translation.y = earth.translation.y;
});

two.play();

// 获取圆周位置
function getPosition(angle, orbit) {
	return {
		x: Math.cos(angle * Math.PI / 180) * orbit,
		y: Math.sin(angle * Math.PI / 180) * orbit
	};
}
