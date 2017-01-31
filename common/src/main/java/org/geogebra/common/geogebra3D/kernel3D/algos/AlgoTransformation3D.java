package org.geogebra.common.geogebra3D.kernel3D.algos;

import org.geogebra.common.geogebra3D.kernel3D.geos.GeoCurveCartesian3D;
import org.geogebra.common.geogebra3D.kernel3D.geos.GeoSurfaceCartesian3D;
import org.geogebra.common.kernel.Kernel;
import org.geogebra.common.kernel.arithmetic.ExpressionNode;
import org.geogebra.common.kernel.arithmetic.Function;
import org.geogebra.common.kernel.arithmetic.FunctionNVar;
import org.geogebra.common.kernel.arithmetic.FunctionVariable;
import org.geogebra.common.kernel.arithmetic.MyDouble;
import org.geogebra.common.kernel.geos.GeoFunction;
import org.geogebra.common.kernel.geos.GeoFunctionNVar;

/**
 * Class for static methods used for 3D transformations
 * 
 * @author mathieu
 *
 */
public class AlgoTransformation3D {

	/**
	 * set GeoFunction to GeoCurveCartesian3D
	 * 
	 * @param kernel
	 *            kernel
	 * @param geoFun
	 *            x->f(x) function
	 * @param curve
	 *            t->(x,y,z) curve
	 */
	static final public void toGeoCurveCartesian(Kernel kernel,
			GeoFunction geoFun, GeoCurveCartesian3D curve) {
		FunctionVariable t = new FunctionVariable(kernel, "t");
		FunctionVariable x = geoFun.getFunction().getFunctionVariable();
		ExpressionNode yExp = (ExpressionNode) geoFun
				.getFunction().getExpression().deepCopy(kernel).replace(x, t);
		Function[] fun = new Function[3];
		fun[0] = new Function(new ExpressionNode(kernel, t), t);
		fun[1] = new Function(yExp, t);
		fun[2] = new Function(new ExpressionNode(kernel, 0), t);
		curve.setFun(fun);
		if (geoFun.hasInterval()) {
			curve.setInterval(geoFun.getIntervalMin(), geoFun.getIntervalMax());
		} else {
			double min = kernel.getXminForFunctions();
			double max = kernel.getXmaxForFunctions();
			curve.setInterval(min, max);
			// curve.setHideRangeInFormula(true);
		}
	}

	/**
	 * @param kernel
	 *            kernel
	 * @param geoFun
	 *            function
	 * @param surface
	 *            surface
	 */
	static final public void toGeoSurfaceCartesian(Kernel kernel,
			GeoFunctionNVar geoFun, GeoSurfaceCartesian3D surface) {
		FunctionVariable u = new FunctionVariable(kernel, "u");
		FunctionVariable v = new FunctionVariable(kernel, "v");
		FunctionVariable x = geoFun.getFunction().getFunctionVariables()[0];
		FunctionVariable y = geoFun.getFunction().getFunctionVariables()[1];
		ExpressionNode yExp = (ExpressionNode) geoFun.getFunction()
				.getExpression().deepCopy(kernel).replace(x, u).wrap()
				.replace(y, v);
		FunctionNVar[] fun = new FunctionNVar[3];
		fun[0] = new FunctionNVar(new ExpressionNode(kernel, u),
				new FunctionVariable[] { u, v });
		fun[1] = new FunctionNVar(new ExpressionNode(kernel, v),
				new FunctionVariable[] { u, v });
		fun[2] = new FunctionNVar(yExp, new FunctionVariable[] { u, v });
		surface.setFun(fun);
		double[] min = new double[2];
		double[] max = new double[2];
		for (int dim = 0; dim < 2; dim++) {
			min[dim] = MyDouble.isFinite(geoFun.getMinParameter(dim))
					? geoFun.getMinParameter(dim) : -10;
			max[dim] = MyDouble.isFinite(geoFun.getMaxParameter(dim))
					? geoFun.getMaxParameter(dim) : 10;
		}
		surface.setStartParameter(min);
		surface.setEndParameter(max);
	}

}
